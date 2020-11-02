const validatePassword=(password)=>{
  var passw=  /^[A-Za-z0-9!@#$%^&*]\w{5,14}$/;
  if(!password.match(passw)) 
  { 
    return false;
  }
  return true;
}
export default validatePassword;
