import jwt from "jsonwebtoken";
import UsuarioRepository from "../repositories/usuarioRepository.js";

const SECRET = "PF$2@@@2$FP";

export default class AuthMiddleware {
    gerarToken(id, email, nome, perfil) {
        let jsonWebToken = jwt.sign(
            {
                id: id,
                nome: nome,
                email: email,
                perfil: perfil,
            },
            SECRET,
            {
                expiresIn: 3000,
            }
        );

        return jsonWebToken;
    }

    async validarToken(req, res, next) {
        next();
        //recupera o token da requisição.
        if (req.cookies.token) {
            //se existir no cabeçalho recupera o valor
            let token = req.cookies.token;

            try {
                //validar o token e recupera as informações do usuário que estão no token
                let payload = jwt.verify(token, SECRET);
                let usuarioRepository = new UsuarioRepository();
                //valida o nosso usuário no banco de dados
                let usuario = await usuarioRepository.buscarPorId(payload.id);
                if (usuario) {
                    if (usuario.ativo) {
                        req.usuarioLogado = usuario;
                        next();
                    } else {
                        return res.status(401).json({ msg: "Usuário inativo" });
                    }
                } else {
                    return res
                        .status(404)
                        .json({ msg: "Usuário não encontrado" });
                }
            } catch (ex) {
                console.log(ex);
                return res.status(401).json({ msg: "Token inválido!" });
            }
        } else {
            return res.status(401).json({ msg: "Token não encontrado!" });
        }
    }
}
