import { isDateExpired } from './dates.js'

export const tokenCheck = async (client, token) => {
    const users = await client.query(`
    SELECT *
    FROM task_manager_tokens
    JOIN task_manager_users ON task_manager_tokens.user_id = task_manager_users.id
    WHERE token = '${token}'
    `)

    if (users.rows.length > 0 && isDateExpired(users.rows[0].expires_at)) {
        // selected date is in the past
        return false
    }

    return true
}