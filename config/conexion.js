const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '77510331',
    port: 3306,
    database: 'hospitaldb'
});

conexion.connect((err)=>{
    if(err){
        console.log("Ocurrio un error "+err);
    } else {
        console.log("Conexion exitosa");
    }
});

module.exports = conexion;