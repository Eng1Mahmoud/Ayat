const {SignUp,verification} = require("../controlars/userControlar.JS")

const RoutesUsers= (app)=>{
    app.post("/SignUp",SignUp) ;  
    app.post("/verification",verification) ;   
 }
 
 module.exports = RoutesUsers