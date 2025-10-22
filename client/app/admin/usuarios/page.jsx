'use client'

import { useEffect, useState } from "react";

export default function PageUsuarios() {

    //Utilza o useState para mudar o estado da lista
    const [lista, setLista] = useState([]);

    //useEffect para consumir api do backend
    useEffect(() => {
        carregarUsuarios();
    }, []);
    //Function para buscar de uma url
    async function carregarUsuarios() {
        //Guarda a resposta do usuari      GET na raiz dos usuarios
        let response = await fetch("http://localhost:5000/usuario");

        let corpo = await response.json();
        //Muda o estado da lista com o corpo da requisição e faz a interface se re-renderizar
        setLista(corpo);
        //console.log(corpo)
    }

    return (
        <div>
            <h1>Pagina de usuarios</h1>
            <h2></h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                </tr>
                {
                    lista.map((value, index) => {

                       return <tr key={index}>
                            <td>{value.nome}</td>
                            <td>{value.email}</td>
                        </tr>
                    })
                }
            </table>
        </div>
    );
}
