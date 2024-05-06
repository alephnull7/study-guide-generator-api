/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for handling all controller requests in a uniform way
*/

function relayResponse(req, res, result) {
    if (result.hasOwnProperty('buffer')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${result.name}.pdf"`);
        res.status(200);
        res.send(result.buffer);
        return;
    }

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
        case 3:
            res.status(409).json({ message: 'Account Exists' });
            break;
        case 4:
            res.status(409).json({ message: 'Invalid Email' });
            break;
        case 5:
            res.status(409).json({ message: 'Weak Password' });
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