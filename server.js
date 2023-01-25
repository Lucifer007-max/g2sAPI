require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
var sql = require("mssql");
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/admin', require('./main/users/admin.controller'));
app.use('/student', require('./main/students/student.controller'));
app.use('/course', require('./main/courses/courses.controller'));
app.use('/gmt', require('./main/GetmockAPI/getmock.controller'));
// app.use('/courses', require('./main/courses/courses.controller'));
// app.use('/workinggroup', require('./main/workingGroup/workinggroup.controller'));
// app.use('/home' , require('./main/home/home.controller'));
app.use('/fileUploads' , require('./main/fileUploads/fileUploads.controller'));
app.use('/contact' , require('./main/contact/contact.controller'));
app.use('/institution' , require('./main/Institution/institution.controller'));
// app.use('/country' , require('./main/country/country.controller'));
// app.use('/activites' , require('./main/Activites/activites.controller'));
// app.use('/globalJournal' , require('./main/technicalassistance/assistance.controller'));
// app.use('/mail' , require('./main/Email/email.controller'))
// // /app.use('/activites' , require('./main/Activites/activites.controller'));
// app.use( '/admin' , require('./main/admin/admin.controller'))

app.use(express.static('uploads'))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));