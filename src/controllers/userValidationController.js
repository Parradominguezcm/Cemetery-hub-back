import connectPostgresClient from '../helperFunctions/connectPostgresClient.js';
import jwt from 'jsonwebtoken'
import { isDateExpired } from '../helperFunctions/dates.js'

export const userValidationController = async (req, res) => {
    const client = connectPostgresClient();

    const { token } = req.body

    const users = await client.query(`
    SELECT *
    FROM task_manager_tokens
    JOIN task_manager_users ON task_manager_tokens.user_id = task_manager_users.id
    WHERE token = '${token}'
    `)

    var decoded = jwt.verify(token, process.env.SALT);

    if (!isDateExpired(decoded.expiryDate)) {
        res.send({
            userName: users.rows[0].username,
            userFirstName: users.rows[0].firstname,
            userLastName: users.rows[0].lastname,
            userEmail: users.rows[0].email,
        })
    } else {
        res.status = 500
        res.send({
            status: false,
            message: "EXPIRED TOKEN"
        })
    }
}