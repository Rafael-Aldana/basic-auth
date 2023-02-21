'use strict';

const base64 =  require('base-64');
const bcrypt =  require('bcrypt');

let str = 'lucky want to go outside';
let encodedStr = base64.encode(str);
let decodedStr = base64.decode(encodedStr);

console.log('str: ', str);
console.log('encodedStr: ', encodedStr);
console.log('decodedStr: ', decodedStr);

// encode a basic auth string: username:password

let user = 'Rafael:password';
let encodedUser = base64.encode(user);
let decodedUser = base64.decode(encodedUser);

//  why encode? for secure signin information as we log into our server

// create a basic auth string

let authString = `Basic ${encodedUser}`;
console.log('authString: ', authString);

let password = 'pass123';

const encrypt = async () => {
  let hash = await bcrypt.hash(password, 5);
}