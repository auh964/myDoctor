const jwt = require('jsonwebtoken');
const tokenKey = 'sercretPrivateToken';
const payload = {
    data1 : "data1",
    data2:"data2"
};
exports.generateToken = (userInfo) => {
const signData = {
    ...userInfo ,  
    expiresIn:  '12h',
    algorithm:  'RS256'};
return jwt.sign(signData , tokenKey);
};

exports.verify = (token) => {
try{
 return jwt.verify(token,tokenKey); 
}catch(err){
    return null;
}
};