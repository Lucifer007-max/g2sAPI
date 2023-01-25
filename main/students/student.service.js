const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const { QueryTypes } = require('sequelize');
module.exports = {
    create,
    authenticate,
    getallList,
    studentgetbyID
}
async function create(params) {
    // validate
    if (await db.G2Sstudent.findOne({ where: { email: params.email } })) {
        throw 'Username "' + params.email + '" is already taken';
    }
    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }
    await  db.G2Sstudent.create(params);
    return ;

}


async function authenticate({ email, password }) {
    // const user = await db.G2Sstudents.findOne({ where: { email:email} });
    const user = await db.sequelize.query(`select Mail from students where g2sID = 0 and Mail = ${email}`, {
        nest: true,
        type: QueryTypes.SELECT
    });

    
    // if (!user || !(await bcrypt.compare(password, user.hash)))
    //     throw 'Username or password is incorrect';

    if (!user)
        throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}



async function getallList () {
    let data = await db.G2Sstudent.findAll();
    let res = {rows:data};
    return res;
  }


function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}

async function studentgetbyID(id) {
    // const list = await db.G2Sstudent.findByPk(id);
     const list = await db.sequelize.query('SELECT s.* ,fu.filePath FROM students AS s LEFT JOIN fileuploads as fu on s.user_img_id = fu.id where s.id = ' + id, {
        nest: true,
        type: QueryTypes.SELECT
    });
    
    // let image  = await db.G2SfileUploads.findOne({ where: {id: G2Sstudent.user_img_id } }); 
    // let usser = students.get(image);
    // if('filePath' in usser){
    //     usser['image'] = usser.filePath;
    // }
    // else{
    //     usser['image'] = "";
    // }

    if (!list) throw 'No record found';
    return list;
}