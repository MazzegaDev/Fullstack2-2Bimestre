"use client";

import { useRef, useState } from "react";

export default function Page() {
 let {lista, setLista} = useState([]); //<- inicia a lista vazia
  

  function excluir(id){
    //Atualiza o estado da lista filtrando pelo id que eu quero deixar de fora
    setLista(lista.filter(x => x.id != id));
  }

  return (
    
      <div>
        <h2>Pokemons cadastrados</h2>
        {
            lista.length == 0 ? <p>Nenhum pokemon cadastrado</p> :
            <ul>
            {lista.map((obj, index) => {
            return (
                <li key={index}>
                    {obj.nome} - {obj.tipo}
                    <span><button onClick={() => excluir(obj.id)}>Excluir</button></span>
                </li>);
            })}
            </ul>
        }
         <a href="/cadastro/formulario">cadastrar</a>   

        
      </div>
  );
}
