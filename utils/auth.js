const {verify} = require('./jwt');

module.exports = (req,res,next)=>{
const {token} = req.headers;
const verifiedInfo = verify(token);
if(!verifiedInfo){
return res.status(401).send("Invalid Token");
}
req.userInfo = verifiedInfo;
next();
};