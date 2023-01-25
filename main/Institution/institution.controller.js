const express = require('express');
const router = express.Router();
const Joi = require('joi');
const institutionService = require('./institution.service')
const validateRequest = require('_middleware/validate-request');

router.post('/register', institutionregisterSchema, institutionregister);
router.post('/authenticateInstitution', authenticateSchema, authenticateInstitution);
module.exports = router;


function institutionregisterSchema(req, res, next) {
    const schema = Joi.object({
        institutionname: Joi.string().required(),
        institutionpassword: Joi.string().min(6).required(),
        institutionemail:Joi.any().required(),
        institutionimg:Joi.any(),
        Type:Joi.any()
    });
    validateRequest(req, next, schema);
}

function institutionregister(req, res, next) {
    institutionService.create(req.body)
    .then((data) => res.json(data))
    .catch(next);
}


function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        institutionemail: Joi.string().required(),
        institutionpassword: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticateInstitution(req, res, next) {
    institutionService.authenticateAdmin(req.body)
        .then(user => res.json(user))
        .catch(next);
}