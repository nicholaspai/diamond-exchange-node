const _ = require('lodash');

// /********************************************
//  * MIDDLEWARE TO DISPLAY MISSING PARAMETERS *
//  ********************************************/
const displayMissingParameters = (request, response, requiredFields) => {
    let i;
    const missingFields = [];

    for (i = 0; i < requiredFields.length; i += 1) {
        const localField = requiredFields[i];

        if (request.body[localField] === undefined) {
            missingFields.push(localField);
        }
    }

    if (missingFields.length > 0) {
        const required = _.fromPairs(_.map(missingFields, index => [index, 'undefined']));
        const fullJson = {
            "status": "400",
            "description": "the following required parameters are missing",
            required
        }
        return response.status(400).send(fullJson);
    } else {
        return false;
    }
};

module.exports = displayMissingParameters;