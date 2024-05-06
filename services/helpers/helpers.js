/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for validating the request parameters and fields for services in a uniform way
*/

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