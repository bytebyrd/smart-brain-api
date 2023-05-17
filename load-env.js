( function loadEnvironment(env){
    if(env === "development"){
        require('dotenv').config({
            path: "config/.env.development"
        })
    }
})(process.env.NODE_ENV);