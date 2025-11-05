import Perfil from "../entities/perfil.js";
import PerfilRepository from "../repositories/perfilRepository.js";

export default class PerfilController {
    #pRepo;
    constructor() {
        this.#pRepo = new PerfilRepository();
    }

    async listar(req, res) {
        try {
            let lista = await this.#pRepo.listar();
            if (lista.length > 0) {
                return res.status(200).json(lista);
            } else {
                return res
                    .status(404)
                    .json({ msg: "Nenhum perfil para listar" });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ msg: "Não foi possivel processar a requisição" });
        }
    }
}
