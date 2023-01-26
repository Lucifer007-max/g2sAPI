const { QueryTypes } = require('sequelize');
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
module.exports = {
    create,
    getList,
    getbyID,
    getActiveCourse

};
    


async function create(params) {
    // validate
    if (await db.G2Scourses.findOne({ where: { coursename: params.coursename } })) {
        throw params.coursename + ' already exists';
    }

    // save user
    await db.G2Scourses.create(params);
}


async function getList(){
    let data = await db.G2Scourses.findAll();
    let res = {rows:data};
    return res;
}

async function getActiveCourse(){
    // let data = await db.G2Scourses.findOne({ where: { coursestatus: "1" } });
    const data = await db.sequelize.query('SELECT c.* ,fu.filePath FROM G2Scourses AS c LEFT JOIN G2Sfileuploads as fu on c.courseimage = fu.id where c.coursestatus = 1', {
        nest: true,
        type: QueryTypes.SELECT
    });
    let res = {rows:data};
    return res;
}

async function getbyID(id) {
    const list = await db.G2Scourses.findByPk(id);
    if (!list) throw 'No record found';
    return list;
}

