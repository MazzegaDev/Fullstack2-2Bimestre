import Database from "../db/database.js";
import ImagemImovel from "../entities/imagemImovel.js";
import Imovel from "../entities/imovel.js";


export default class ImagemImovelRepository {

    #banco;

    constructor() {
        this.#banco = new Database();
    }

    async gravar(entidade) {
        let sql = `insert into tb_imovelimagem (imv_id, imi_imagem)
                    values (?, ?)`;
        let valores = [entidade.imovel.id, entidade.imagem];
        let result = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async deletar(id) {
        let sql = "delete from tb_imovelimagem where imi_id = ?";
        let valores = [id];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletarPorImovel(idImovel) {
        let sql = "delete from tb_imovelimagem where imv_id = ?";
        let valores = [idImovel];

        let result = await this.#banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async listarPorImovel(idImovel) {
        let sql = "select * from tb_imovelimagem where imv_id = ?";
        let valores = [idImovel];

        let rows = await this.#banco.ExecutaComando(sql, valores);
        let lista = [];

        for(let row of rows) {
            lista.push(new ImagemImovel(row["imi_id"], new Imovel(row["imv_id"]), "data:image/jpeg;base64," + row["imi_imagem"].toString("base64")));
        }

        return lista;
    }
}