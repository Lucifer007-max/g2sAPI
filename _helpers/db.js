const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mysql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

   

    // connect to db
    console.log('dbName',dbName);
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.G2Sadmin = require('../main/users/admin.model')(sequelize);
    db.G2Sstudents = require('../main/students/student.model')(sequelize);
    db.G2Scourses = require('../main/courses/courses.model')(sequelize);
    // db.paymentHistory = require('../main/users/paymentHistorys.model')(sequelize);
    // db.courses = require('../main/courses/courses.model')(sequelize);
    db.G2SfileUploads = require('../main/fileUploads/fileUploads.model')(sequelize);
    db.G2Sinstitution = require('../main/Institution/institution.model')(sequelize);
    // //Home---
    // let home = require('../main/home/home.model');
    // db.home = home.marquee(sequelize);
    // db.getamounts = home.getamounts(sequelize);
    // db.info = home.info(sequelize);
    // db.quicklink = home.quicklink(sequelize);
    // db.events = home.events(sequelize);
    // db.banner = home.banner(sequelize);
    // //Working Groups--
    // let workinggroups = require('../main/workingGroup/workinggroup.model');
    // db.workinggroups = workinggroups.workinggroup(sequelize);
    // db.workingEvent = workinggroups.workingEvent(sequelize);
    // //Contact-----
    db.G2scontact = require('../main/contact/contact.model')(sequelize);
    // //CountryLists---
    // let country = require('../main/country/country.model');
    // db.countrylist = country.countrylist(sequelize);
    // db.countriesevents = country.countriesevents(sequelize);

    // let activites = require('../main/Activites/activites.model');
    // db.activiteslists = activites.activiteslists(sequelize);
    // db.activitesevents = activites.activitesevents(sequelize);
    // let globalJournal = require('../main/technicalassistance/assistance.model');
    // db.globalJournal = globalJournal.globalJournal(sequelize);
    // db.Ebooks = globalJournal.Ebooks(sequelize);
    // db.Medicine = globalJournal.Medicine(sequelize);
    // db.NewsLetter = globalJournal.NewsLetter(sequelize);
    db.sequelize = sequelize;
    // //Sub-admin-----
    // let admin = require('../main/admin/admin.model');
    // db.admin = admin.roles(sequelize);

    // //Payment---------
    // db.payment = require('../main/models/payment.model')(sequelize);

    // db.notifications = require('../main/models/notifications')(sequelize);
    
   
    // sync all models with database
    // await sequelize.sync({ alter: true});
}
