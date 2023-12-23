export const isDateExpired = (timestamp) => {
    var now = new Date();
    return (new Date(timestamp) < now)
}
