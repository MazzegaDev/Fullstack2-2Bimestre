'use client'

import FormUsuario from "@/app/components/form/formUsuario";
import { apiClient } from "@/utils/apiClient";
import { use, useEffect, useState } from "react";

export default function FormAlterar({params}){
    /*
        Update
        1 - Pegar o id do usuario pelo params
        2 - Procurar o usuario
        3 - Guardar o objeto em um state
        4 - exibir os dados do usuario encontrado
        5 - inserir novos dados
        6 - atualizar
    */

    /*
        Em react com next para pegarmos o parametro da URL precisamos utilizar o params
    */

    //State que vai guardar o usuario que queremos alterar e enviar como prop pro componente
    const [encontrado, setEncontrado]= useState(null);

    //Utilizando o params para pegar o id da url
    //Usamos chaves porque estamos desestruturando esse objeto que contem o id
    const {id} = use(params);
    
    useEffect(() => {
        console.log("encontrado " + encontrado);
        buscarUsers();
    }, [])
    
    async function buscarUsers() {
        const response = await apiClient.get(`/usuario/${id}`)
        if(response){
            console.log(response)
            setEncontrado(response);
        }   
    }
    


    return(
        <div>
            <h1>Alterar</h1>
            <FormUsuario nome={encontrado}></FormUsuario>
        </div>
    )


}