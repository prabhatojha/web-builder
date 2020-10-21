"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
function handleError(res, error) {
    res.status(500).send({ error: 'Something went wrong' });
}
exports.handleError = handleError;
