export function handleError(res, error) {
    res.status(500).send({ error: 'Something went wrong' });
}