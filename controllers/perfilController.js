import PerfilRepository from "../repositories/perfilRepository.js"


export default class PerfilController {

    #repo

    constructor() {
        this.#repo = new PerfilRepository();
    }

    async listar(req, res) {
        try{
            const lista = await this.#repo.listar();
            if(lista.length > 0) {
               return res.status(200).json(lista);
            }
            else {
                return res.status(404).json({msg: "Nenhum perfil encontrado"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao processar solicitação"});
        }
    }
}