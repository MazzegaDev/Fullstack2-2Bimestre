'use client'

import Formulario from "../components/form/formulario";
import { useState } from "react";


export default function Page(){
    //Para atribuir valores em uma variavel precisamos usar o state.
    //  Variavel   set do valor          
    let [contador, setContador] = useState(0); //<- valor inicial

    let n1 = 18;
    let n2 = 20;

    function somar(){
        alert(n1 + n2);
    }

    //Função que chama o set do contador
    function incrementar(){ //<- faz o componente ser re-renderizado
        //o set pega o valor atual do contador e incrementar +1
        setContador(contador + 1);
    }

    return (
        <div>
            <button onClick={somar}>Clique</button>
            <hr />
            <br />
            <h2>useState</h2>
            <h2>Contagem: {contador}</h2>
            <button onClick={incrementar}>Incrementar</button>
            <hr />
            <br />
            <h1>Componentes</h1>
            <Formulario/>
         </div>
    )
}