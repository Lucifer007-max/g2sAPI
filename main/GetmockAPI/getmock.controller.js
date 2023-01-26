const express = require("express");
const route = express.Router(); 
const config = require('./setting'); 
var sql = require("mssql"); 

route.get('/courseGet', getCourses) 
route.get('/studentGet', getStudent) 
route.get('/institutionGet', getInstitution) 
module.exports = route;



// Course Get
async function getCourses(req, res) {
    try {
        let db = await sql.connect(config);
        let data = await db.request().query("select CourseTitle from Courses where isDeleted = 'false' ");
        res.status(200).json({
            success: true,
            data: data.recordsets[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error : data not show"
        });
    }
}
// Student Get
async function getStudent(req, res) {
    try {
        let db = await sql.connect(config);
        let data = await db.request().query("select * from Students where g2sID = 1");
        res.status(200).json({
            success: true,
            data: data.recordsets[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error : data not show"
        });
    }
}
async function getInstitution(req, res) {
    try {
        let db = await sql.connect(config);
        let data = await db.request().query("select * from InstitutionMst where g2sID = 1");
        res.status(200).json({
            success: true,
            data: data.recordsets[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "error : data not show"
        });
    }
}
