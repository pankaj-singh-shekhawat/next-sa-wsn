import dotenv from "dotenv";
dotenv.config();
import { verifyPassword } from "../helpers/utils_hash.js";
import Database from './DBModel.js';
const WorkspaceDBInstance = new Database({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});

export async function getAllUsers(){
  const query = `SELECT * FROM users`;
  return await WorkspaceDBInstance.getQueries(query,[]);
};

export async function getUserByEmail(email){
  const query = `SELECT * FROM users WHERE email = ?`;
  return await WorkspaceDBInstance.getQueries(query,[email]);
};

export async function getUserById (id) {
  const query = `SELECT * FROM users WHERE id = ?`;
  return await WorkspaceDBInstance.getQueries(query,[id]);
};

export async function updateUserById (id,dataObj){
  var QueryCols = [];
  var QueryValues = [];
  Object.entries(dataObj).forEach(([key, value]) => {
    QueryCols.push(`${key} = ?`);
    QueryValues.push(value);
  });
  QueryValues.push(id);
  var updateQuery = `UPDATE users SET ${QueryCols.join(", ")} WHERE id = ?`;
  return await WorkspaceDBInstance.postQueries(updateQuery,QueryValues);
}

export async function checkAndcreateNewUser (name,email,passwordHash){
  var resp = { error : false, message : "" };
  try {
    var getResp = await getUserByEmail(email);
    if(getResp.error) throw getResp.message;
    if(getResp.data && getResp.data.length > 0) throw "User already exists.";
    var Query = `INSERT INTO users (name, email, passwordhash, role, status) VALUES (?, ?, ?, 'user', 0)`;
    var postResp = await WorkspaceDBInstance.postQueries(Query,[name,email,passwordHash]);
    if(postResp.error) throw postResp.message;
    resp.message = "User created successfully.";
  } catch (err) {
    resp.error = true;
    resp.message = err;
    console.log("Error in processing authentication.");
    console.log(err);
  }
  return resp;
}

export async function authenticateUserByEmailPwd (email, password){
  var resp = { error : false, message : "" , user : {}};
  try {
    var getResp = await getUserByEmail(email);
    if(getResp.error) throw getResp.message;
    if(!getResp.data || getResp.data.length == 0) throw "User does not exist.";
    if(getResp.data.length > 1) throw 'Multiple users found.';
    var user = getResp.data[0];
    if (user.status !== 1) throw "User account is not active.";
    const isPasswordValid = verifyPassword(user.passwordhash,password);
    if (!isPasswordValid) throw "Credentials entered are wrong";
    resp.message = "User authentication successful.";
    resp.user = user;
  } catch (err) {
    console.log("error while authenticating", err);
    resp.error = true;
    resp.message = err;
    console.log("Error in processing authentication.");
    console.log(err);
  }
  return resp;
};