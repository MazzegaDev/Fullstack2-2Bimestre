import perfil from "../entities/perfil.js";
import database from "../db/database.js";

export default class PerfilRepository{
    #banco;
    constructor(){
        this.#banco = new database();
    }

    async listar(){
        const sql = "select * from tb_perfil";

        const rows = await this.#banco.ExecutaComando(sql);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            
            lista.push(new perfil(
                row["per_id"],
                row["per_descricao"],
            ))
        }
        return lista;
    }
}