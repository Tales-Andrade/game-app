const awaitHandlerFactory = (middleware) => {
    return async (res, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = awaitHandlerFactory;