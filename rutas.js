const router = require('express').Router();
const conexion = require('./config/conexion');
//agregar rutas----------
//get usuarios
router.get('/getUsuarios',(req, res)=>{
    let sql = 'select * from usuarios'
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});
//get 1 usuarios
router.get('/getUsuarios/:id',(req, res)=>{
    const {id} = req.params
    let sql = 'select * from usuarios where idusuarios = ?'
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0]);
        }
    });
});
//get usuarios con contra y pass
router.post('/getUsuariosLogin',(req, res)=>{
    const {correousuario, contrausuario} = req.body
    let sql = `select * from usuarios where correousuario = '${correousuario}' and contrausuario = '${contrausuario}'`   
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else {
            res.json(rows[0]);
        }
    })
});
//agregar usuarios
router.post('/addUsuario',(req, res)=>{
    const {nombreusuario, correousuario, contrausuario, categoria} = req.body
    let sql = `insert into usuarios(nombreusuario, correousuario, contrausuario, categoria) 
                values('${nombreusuario}','${correousuario}','${contrausuario}','${categoria}')`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else {
            res.json({status: 'usuario agregado'});
        }
    })
});
//eliminar usuarios
router.delete('/deleteUsuario/:id',(req, res)=>{
    const {id}=req.params
    let sql = `delete from usuarios where idusuarios = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else {
            res.json({status: 'usuario eliminado'});
        }
    })
});
//modificar usuarios
router.put('/updateUsuario/:id',(req, res)=>{
    const {id}=req.params
    const {nombreusuario, correousuario, contrausuario, categoria} = req.body
    let sql = `update usuarios set
                nombreusuario = '${nombreusuario}',
                correousuario='${correousuario}',
                contrausuario='${contrausuario}',
                categoria='${categoria}'
                where idusuarios = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else {
            res.json({status: 'usuario modificado'});
        }
    })
});
//--------------------

module.exports = router;