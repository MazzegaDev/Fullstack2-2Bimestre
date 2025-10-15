//O context permite que toda a arvore de componente tenha acesso a nossa lista
'use client'

const { useContext, useState, createContext } = require("react");

//Cria um contexto
const PokemonContext = createContext();

//Cria um provedor para prover o conteudo do contexto
export const PokemonProvider = ({children}) => {
    const [lista, setLista] = useState([]);

    return <PokemonContext.Provider value={{lista, setLista}}>
        {children}
    </PokemonContext.Provider>
}

export default PokemonContext;