'use client'

const { useContext, useState, createContext } = require("react");

//cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const  UserProvider = ({children}) => {
    //Guarda a info do usuario
    const [user, setUser] = useState(null);

    //Retorna para as paginas
    return <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
}

//exporta o contexto
export default UserContext;