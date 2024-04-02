async function serviceModel(requestData, neededFields, modelRequest) {
    const requestKeys = Object.keys(requestData);
    for (let field of neededFields) {
        if (!requestKeys.includes(field)) {
            return 0;
        }
    }
    return await modelRequest;
}

module.exports = serviceModel;