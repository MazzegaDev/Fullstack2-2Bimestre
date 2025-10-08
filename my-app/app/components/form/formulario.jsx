

import { useEffect } from "react"

export default function Formulario(){

    //Apenas se inicia quando a interface estiver carregada
    //Usada para buscar dados da API
    useEffect(() => {
        //alert('Terminei de carregar')
    })


    return (
        <div>
            <label htmlFor="">Nome</label>
            <input type="text"/>
        </div>
    )
}