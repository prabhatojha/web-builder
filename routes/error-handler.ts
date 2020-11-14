export function handleError(res, errors = ['Something went wrong'], errorCode = 500) {
    res.status(errorCode).send({ errors, errorCode, time: Date.now() });
}

export function handleSuccess(res, data = {}, resCode = 200) {
    res.status(resCode).send(data);
}