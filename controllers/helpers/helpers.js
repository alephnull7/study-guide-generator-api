function relayResponse(res, result) {
    switch (result) {
        case 0:
            res.status(400).json({ message: 'Bad Request' });
            break;
        case 1:
            res.status(204).send();
            break;
        default:
            res.status(201).json(result);
    }
}

async function controlService(req, res, serviceRequest) {
    try {
        let result = await serviceRequest;
        relayResponse(res, result);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = controlService;