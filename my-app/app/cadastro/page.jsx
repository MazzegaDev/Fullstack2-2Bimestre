"use client";

import { useContext, useRef, useState } from "react";
import PokemonContext from "../context/pokemonContext";
import Link from "next/link";
import RenderPokemon from "../components/listaPokemon/renderPokemon";

export default function Page() {
 let {lista, setLista} = useContext(PokemonContext); //<- inicia a lista com contexto do pokemon
  

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
            {lista.map((value, index) => {
            return (
                  <RenderPokemon excluir={excluir} value={value} index={index}></RenderPokemon>
                )
            })}
            </ul>
        }
         <Link href="/cadastro/formulario">cadastrar</Link>   

        
      </div>
  );
}
