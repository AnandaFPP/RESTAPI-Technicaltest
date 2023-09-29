const Pool = require('../config/db')


const createUser = (data) => {
  const {user_id, user_name, passwordHash} = data
  return Pool.query(`INSERT INTO users(user_id, user_name, user_password) VALUES('${user_id}', '${user_name}', '${passwordHash}')`)
}

const findUserByName =(user_name)=>{
  return  new Promise ((resolve,reject)=> 
  Pool.query(`SELECT * FROM users WHERE user_name = '${user_name}'`,(err,res)=>{
    if(!err){
      resolve(res)
    }else{
      reject(err)
    }
  })
  )
}

module.exports = {
  createUser,
  findUserByName
}