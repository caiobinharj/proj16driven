function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

const badRequestError = (message) => createError(400, message); // 400 Bad Request
const notFoundError = (message) => createError(404, message);     // 404 Not Found
const conflictError = (message) => createError(409, message);   // 409 Conflict
const unprocessableEntityError = (message) => createError(422, message); // 422 Unprocessable Entity

module.exports = {
    badRequestError,
    notFoundError,
    conflictError,
    unprocessableEntityError,
};