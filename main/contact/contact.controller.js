const express = require('express');
const router = express.Router();
const joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorizeAdmin = require('_middleware/authorizeAdmin');
const contactService = require('./contact.service')

module.exports = router;

router.post( '/create' , contactSchema  , contactCreate)
router.get( '/' , contactGet)
router.delete ('/:id' , authorizeAdmin() , _delete )
function contactSchema (req, res ,next) {
    const schema = joi.object({
        fullname : joi.any().required(),
        email : joi.any().required(),
        subject: joi.any().required(),
        msg : joi.any().required(),
    });
    validateRequest(req, next , schema);

}

function contactCreate (req, res, next) {
    contactService.create(req.body)
    .then(()=> res.json({message: 'Contact Details Submit Sucessfully'}))
    .catch(next);

}

function contactGet(req, res, next){
    contactService.contactGet(req.query.page , req.query.limit)
    .then(lists => res.json(lists))
    .catch(next)
}

function _delete(req , res, next) {
    contactService.delete(req.params.id)
    .then(() => res.json({message : 'Contact Delete Sucessfully'}))
    .catch(next)
}
