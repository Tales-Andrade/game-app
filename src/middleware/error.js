function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    // for now
    console.log(`${error}`);

    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).render('error', { error });
}

module.exports = errorMiddleware;