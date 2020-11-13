export function handleError(res, errors, errorCode = 500) {
    res.status(errorCode).send({ errors, errorCode, time: Date.now() });
}