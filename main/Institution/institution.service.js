const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const { QueryTypes } = require('sequelize');
module.exports = {
    create,
    authenticateAdmin
}
async function create(params) {
    // validate
    if (await db.G2Sinstitution.findOne({ where: { institutionemail: params.institutionemail } })) {
        throw 'Username "' + params.institutionemail + '" is already taken';
    }
    // hash password
    if (params.institutionpassword) {
        params.hash = await bcrypt.hash(params.institutionpassword, 10);
    }
    await  db.G2Sinstitution.create(params);
    return {success : "Institution Added Successfully"};

}



async function authenticateAdmin({ institutionemail, institutionpassword }) {
    const user = await db.G2Sinstitution.scope('withHash').findOne({ where: { institutionemail:institutionemail}});

    // if (!user || !(await bcrypt.compare(institutionpassword, user.hash)))
    //     throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}




function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}
