import swaggerAutogen from "swagger-autogen";

const doc = {
    host: "localhost:5000",
    info: {
        title: "API REST - PFS2",
        description: "API REST para a construção do backend na disciplina de PFS2"
    },
    components: {
        schemas: {
            
            erro: {
                msg: 'Mensagem de erro'
            },
            usuario: {
                id: 999,
                nome: "Fulano de Tal",
                email: "fulano@unoeste.br",
                senha: "123abc",
                ativo: true,
                perfil: {
                    id: 1
                }
            },
        },
                '@schemas': {
            imovel: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 999,
                        required: false,
                    },
                    descricao: {
                        type: "string",
                        required: true,
                    },
                    endereco: {
                        type: "string",
                        required: true,
                    },
                    cep: {
                        type: "string",
                        required: true,
                    },
                    bairro: {
                        type: "string",
                        required: true,
                    },
                    cidade: {
                        type: "string",
                        required: true,
                    },
                    valor: {
                        type: "number",
                        required: true,
                    },
                    disponivel: {
                        type: "string",
                        required: true,
                    },
                    imagens: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "binary"
                        }
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
}

const routes = ['./server.js']
const outputJson = './swaggerOutput.json';
swaggerAutogen({openapi: '3.0.0'})(outputJson, routes, doc)
.then(async () => {
  await import("./server.js");
})
