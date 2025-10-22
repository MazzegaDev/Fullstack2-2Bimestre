import express from 'express'
import PerfilController from '../controllers/perfilController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new PerfilController();
let auth = new AuthMiddleware();
router.get("/", auth.validarToken,  (req, res) => {
    //comentarios do swagger
    // #swagger.tags = ['Perfil']
    // #swagger.summary = 'Listar todos os Perfis'

    /* #swagger.security = [{
        "bearerAuth": []
    }]
    */

    /* #swagger.responses[404] = {
        description: 'Nenhum usuário encontrado na consulta',
        schema: { $ref: '#/components/schemas/erro' }
    }
    */
    ctrl.listar(req, res)
});

export default router;