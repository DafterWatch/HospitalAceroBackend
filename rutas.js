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
//get doctores
router.get('/getDoctores',(req, res)=>{
    let sql = 'select * from doctores'
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});
//get 1 doctor
router.get('/getDoctores/:id',(req, res)=>{
    const {id} = req.params
    let sql = 'select * from doctores where id = ?'
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0]);
        }
    });
});
//get areas
router.get('/getAreas',(req, res)=>{
    let sql = 'select * from area'
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});
//get 1 area
router.get('/getAreas/:id',(req, res)=>{
    const {id} = req.params
    let sql = 'select * from area where id = ?'
    conexion.query(sql,[id], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows[0]);
        }
    });
});
//get 1 area por nombre
router.get('/getAreasName/:areaName',(req, res)=>{
    const {areaName} = req.params
    let sql = `select d.id, d.doctorName, d.doctorDetails, d.doctorImg 
    from doctores d inner join area a on d.doctorDetails = a.areaName
    where a.areaName = ?`
    conexion.query(sql,[areaName], (err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    });
});
//agregar citas
router.post('/addCita',(req, res)=>{
    const {fecha, doctorId, pacienteId, estado} = req.body
    let sql = `insert into citasMedicas(fecha, doctorId, pacienteId, estado)
                values('${fecha}',${doctorId},${pacienteId},${estado})`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else {
            res.json({status: 'usuario agregado'});
        }
    })
});
//--------------------

module.exports = router;