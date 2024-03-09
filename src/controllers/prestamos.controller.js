import { pool } from '../database/conexion.js';

export const listarPrestamo = async(req,res)=> {

    const [result] = await pool.query('select * from prestamo');
    res.status(200).json(result);
};

export const registrarPrestamos = async(req,res)=> {
    try{
        let {nombre_ambiente,fecha_prestamo,fecha_entrega,nombre_celador,observaciones,fk_usuario,fk_ambiente} = req.body;
        let sql = `insert into prestamo (nombre_ambiente,fecha_prestamo,fecha_entrega,nombre_celador,observaciones,fk_usuario,fk_ambiente) values('${nombre_ambiente}','${fecha_prestamo}','${fecha_entrega}','${nombre_celador}','${observaciones}','${fk_usuario}','${fk_ambiente}')`;
    
        let [rows] = await pool.query(sql);

        if(rows.affectedRows>0){
            return res.status(200).json({"message": "se registro con exito el prestamo"});
        }else{
            return res.status(403).json({"message": "Error al registrar prestamos"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const eliminarPrestamos = async (req,res)=>{
    try{
        let id = req.params.id;
        let sql = `delete from prestamo where id_prestamo = ${id}`;
        let [rows] = await pool.query(sql);

        if(rows.affectedRows>0){
            return res.status(200).json({"message": "prestamo eliminado con exito"})
        }else{
            return res.status(403).json({"message": "prestamo no eliminado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarPrestamos = async (req,res)=> {
    try{
        let id = req.params.id;
        let {nombre_ambiente , fecha_prestamo, fecha_entrega,nombre_celador,observaciones,fk_usuario,fk_ambiente} = req.body;
        let sql = `UPDATE prestamo SET nombre_ambiente = ?,
                                    fecha_prestamo = ?,
                                    fecha_entrega = ?,
                                    nombre_celador = ?,
                                    observaciones = ?,
                                    fk_usuario = ?,
                                    fk_ambiente = ?
                                    WHERE id_prestamo = ?`;
        let [rows] = await pool.query(sql, [nombre_ambiente, fecha_prestamo, fecha_entrega,nombre_celador,observaciones,fk_usuario,fk_ambiente ,id]);
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "prestamo actualizado con exito"})
        }else{
            return res.status(403).json({"message": "prestamo no actualizado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const consultarPrestamos = async (req,res)=>{
    try{
        let id = req.params.id;
        let sql = `select * from prestamo where id_prestamo = ?`;
        let [rows]=await pool.query(sql, [id]);
        if(rows.length>0){
            return res.status(200).json(rows);
        }else{
            return res.status(404).json({"message": "prestamo no encontrado"});
        }
    }catch (e){ 
        return res.status(500).json({"message":e.message})
    }
}