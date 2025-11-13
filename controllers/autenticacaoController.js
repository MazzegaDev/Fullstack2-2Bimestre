import AuthMiddleware from "../middlewares/authMiddleware.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import jwt from 'jsonwebtoken';


export default class AutenticacaoController {

    #usuarioRepository;

    constructor() {
        this.#usuarioRepository = new UsuarioRepository();
    }

    async token(req, res) {

        try{
            let {email, senha} = req.body;
            if(email && senha) {
                //chama o repository para encontrar usuario com email e senha
                let usuario = await this.#usuarioRepository.validarAcesso(email, senha);
                if(usuario) {
                    //gerar token;
                    let auth = new AuthMiddleware();
                    let token = auth.gerarToken(usuario.id, usuario.email, usuario.nome, usuario.perfil.id);
                    res.cookie("token", token, {
                        httpOnly: true,
                    })
                    return res.status(200).json({token: token, usuario: usuario});
                }
                else {
                    return res.status(404).json({msg: "Usuário não encontrado"});
                }
            }
            else {
                return res.status(400).json({msg: "Informe um e-mail e uma senha para gerar um token de acesso!"});
            }
        }
        catch(exception) {
            console.log(exception);
            return res.status(500).json({msg: "Erro ao gerar token de acesso"})
        }
    }


    //Devolve as informações do usuario logado
    async usuario(req, res){
        try {
            if(!req.usuarioLogado){
                throw new Error ("Erro ao obter usuario.");
            }
            return res.status(200).json(req.usuarioLogado)
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg: "Não foi possivel processar a requisição"})
        }
    }

}