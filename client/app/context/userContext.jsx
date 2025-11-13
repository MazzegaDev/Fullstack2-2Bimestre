'use client'

import { apiClient } from "@/utils/apiClient";

const {useState, createContext, useEffect } = require("react");

//cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const  UserProvider = ({children}) => {
    //Guarda a info do usuario
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    //Precisamos recuperar as informações do usuario logado.
    useEffect(() => {
        carregarUsuario();
    }, [])

    async function carregarUsuario(){
        let response = await apiClient.get("/autenticacao/usuario");
        if(response){
            setUser(response);

        }
        setLoading(false);
    }
    //Isso faria que o contexto nao se perderia ao apertar f5


    //Retorna para as paginas
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {loading ? (
                <html>
                    <body>
                        <h1>Carregando</h1>
                    </body>
                </html>
            ) : (
                { children }
            )}
        </UserContext.Provider>
    );
}

//exporta o contexto
export default UserContext;