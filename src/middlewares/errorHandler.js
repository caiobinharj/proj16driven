
function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || 'Erro interno do servidor.';
    console.error(`[ERROR ${status}]: ${message}`, err.stack);
    return res.status(status).json({ message });
}

module.exports = errorHandler;