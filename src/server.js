import express from 'express'
import usuarioRouter from './routes/usuarioRoute.js';
import imovelRouter from './routes/imovelRoute.js';
import authRouter from './routes/authRoute.js';
import locacaoRouter from './routes/locacaoRoute.js';
import perfilRouter from "./routes/perfilRoute.js"
//transforma cookie em obj
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express'
//Permite o frontend se comunicar com o backend
import cors from 'cors';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./swaggerOutput.json");
const server = express();

//Permite a devolução dos cookies
server.use(cors({credentials: true, origin: "http://localhost:3000"}));
server.use(express.json());
server.use(cookieParser());

server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson));
server.use("/perfil", perfilRouter);
server.use("/usuario", usuarioRouter);
server.use("/imovel", imovelRouter);
server.use("/autenticacao", authRouter);
server.use("/locacao", locacaoRouter);

server.listen(5000, function() {
    console.log("backend em funcionamento!");
})
