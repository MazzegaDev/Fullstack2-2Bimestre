


import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import PerfilController from '../controllers/perfilController.js';

const router = express.Router();

let ctrl = new PerfilController();
let auth = new AuthMiddleware();
router.get("/", auth.validarToken, (req, res) => {

    // #swagger.tags = ['Perfil']
    // #swagger.tags = 'Retorna uma lista de perfis'

    /*
        #swagger.security = [{
            "bearerAuth": []
        }]
    */

    ctrl.listar(req, res);
})

export default router;
