"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSuccess = exports.handleError = void 0;
function handleError(res, errors, errorCode) {
    if (errors === void 0) { errors = ['Something went wrong']; }
    if (errorCode === void 0) { errorCode = 500; }
    res.status(errorCode).send({ errors: errors, errorCode: errorCode, time: Date.now() });
}
exports.handleError = handleError;
function handleSuccess(res, data, resCode) {
    if (data === void 0) { data = {}; }
    if (resCode === void 0) { resCode = 200; }
    res.status(resCode).send(data);
}
exports.handleSuccess = handleSuccess;
