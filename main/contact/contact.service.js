const db = require('_helpers/db')
module.exports = {
    create,
    contactGet,
    delete: _delete,
}

async function create(params) {
  await  db.G2scontact.create(params)
}

async function contactGet(){
  let data = await db.G2scontact.findAll();
  let res = {rows:data};
  return res;
}

async function getList(id){
  const list = await db.G2scontact.findByPk(id);
  if (!list) throw 'No record found';
  return list;
}

async function _delete(id){
  const list =  await getList(id);
  await list.destroy();
}