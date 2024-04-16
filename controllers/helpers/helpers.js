function relayResponse(req, res, result) {
    switch (result) {
        case 0:
            res.status(400).json({ message: 'Bad Request' });
            break;
        case 1:
            res.status(204).send();
            break;
        case 2:
            res.status(401).json({ message: 'Unauthorized' });
            break;
        default:
            const successCode = getSuccessCode(req.method);
            res.status(successCode).json(result);
    }
}

function getSuccessCode(method) {
    switch (method) {
        case 'POST':
            return 201;
        default:
            return 200;
    }
}

async function controlService(req, res, serviceRequest) {
    try {
        let result = await serviceRequest;
        relayResponse(req, res, result);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = controlService;