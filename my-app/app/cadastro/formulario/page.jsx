"use client";
import Link from "next/link";
import { useContext, useRef } from "react";
import { useState } from "react";
import PokemonContext from "../../context/pokemonContext";


export default function Page() {
  let { lista, setLista } = useContext(PokemonContext); //Usa o context do pokemon
  let nome = useRef("");
  let tipo = useRef(""); //<- o hook use ref faz a ligação diretamente a um input, entao uma variavel passa a ser um input

  function cadastrar() {
    //console.log(nome.current.value)
    //console.log(tipo.current.value)
    //Current -> Acessa o input da variavel referenciada com o curret
    //value -> Pega o valor dessa variavel referenciada
    let nomeV = nome.current.value;
    let tipoV = tipo.current.value;
    if (nomeV != "" && tipoV != "") {
      setLista([...lista,{
          //<- Utilizadno o spread operatro a lista antiga recebe a lista nova
          id: Date.now(),
          nome: nomeV,
          tipo: tipoV,
        },
      ]);

      nome.current.value = "";
      tipo.current.value = "";
    } else {
    }
    console.log(lista);
  }

  return (
    <div>
      <h1>Cadastro de pokemon</h1>

      <div>
        <label htmlFor="nome">Nome: </label>
        <br />
        {/* 
            Para chamar funções em eventos precisamos definir uma função anonima para assim podermos passsar o parametro do evento a ser iniciado
        */}
        {/* ref esta fazendo a ligação do input a variavel nome */}
        <input ref={nome} type="text" name="nome" />
      </div>

      <div>
        <label htmlFor="">Tipo</label>
        <br />
        <input ref={tipo} type="text" name="nome" />
      </div>
      <div>
        <button onClick={cadastrar}>Gravar</button>
      </div>
      <Link href="/cadastro">exibir</Link>
      <br />
      <br />
      <hr />
    </div>
  );
}
