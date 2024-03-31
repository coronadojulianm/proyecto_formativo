import { pool } from '../database/conexion.js';

export const listarElementos = async(req,res)=> {
        try{
            const [result] = await pool.query('select * from elementos');
            
            if(result.length>0){
                return res.status(200).json(result); 
            } else {
                return res.status(404).json({'message': 'No se encontró elementos'});
            }
            
        }catch(e){
            return res.status(500).json({'message': 'error' + e});
        }
};


export const registrarElemento = async(req,res)=> {
    try {
        let { codigo_sena, estado, nombre_elemento, tipo_elemento, nota_cambio, cambios, fk_ambiente } = req.body;
        let sql = `INSERT INTO elementos (codigo_sena, estado, nombre_elemento, tipo_elemento, nota_cambio, cambios, fk_ambiente) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
        // Utilizamos un array para evitar la inyección de SQL
        let values = [codigo_sena, estado, nombre_elemento, tipo_elemento, nota_cambio, cambios, fk_ambiente];
    
        let [rows] = await pool.query(sql, values);
        if(rows.affectedRows > 0) {
            return res.status(200).json({"message": "Se registró con éxito el elemento"});
        } else {
            return res.status(403).json({"message": "Elemento no registrado"});
        }
    } catch(e) {
        return res.status(500).json({"message": e.message});
    }
}





export const eliminarElemento = async (req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from elementos where id_elementos = ${id}`;
        let [rows] = await pool.query(sql);
    
        if(rows.affectedRows>0){
            return res.status(200).json({"message": "Elemento eliminado con exito"})
        }else{
            return res.status(403).json({"message": "Elemento no eliminado"});
        }
    }catch(e){
        return res.status(500).json({"message": e.message});
    }
}

export const actualizarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let { codigo_sena, estado, nombre_elemento, tipo_elemento, fk_ambiente, nota_cambio, cambios } = req.body;
        let sql = `UPDATE elementos SET 
                       codigo_sena = ?, 
                       estado = ?, 
                       nombre_elemento = ?, 
                       tipo_elemento = ?, 
                       fk_ambiente = ?,
                       nota_cambio = ?,
                       cambios = ?
                   WHERE id_elementos = ?`; // Corregido a id_elementos
        let [rows] = await pool.query(sql, [codigo_sena, estado, nombre_elemento, tipo_elemento, fk_ambiente, nota_cambio, cambios, id]);
        if (rows.affectedRows > 0) {
            return res.status(200).json({ "message": "Elemento actualizado con éxito" });
        } else {
            return res.status(403).json({ "message": "Elemento no actualizado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
}




export const consultarElemento = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM elementos WHERE id_elementos = ?`; // Buscar por ID
        let [rows] = await pool.query(sql, [id]);
        if (rows.length > 0) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ "message": "Elemento no encontrado" });
        }
    } catch (e) {
        return res.status(500).json({ "message": e.message });
    }
}
