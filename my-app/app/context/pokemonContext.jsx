//O context permite que toda a arvore de componente tenha acesso a nossa lista
'use client'

const { useContext, useState, createContext } = require("react");


const pokemonContext = createContext();

export const pokemonProvider = ({children}) => {
    const [lista, setLista] = useState([]);

    return <pokemonContext.Provider value={{lista, setLista}}>
        {children}
    </pokemonContext.Provider>
}

export default pokemonContext;