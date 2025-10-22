"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PageUsuarios() {
    //Utilza o useState para mudar o estado da lista
    const [lista, setLista] = useState([]);

    //useEffect para consumir api do backend
    useEffect(() => {
        carregarUsuarios();
    }, []);
    //Function para buscar de uma url
    async function carregarUsuarios() {
        //Guarda a resposta da requisição      GET na raiz dos usuarios
        let response = await fetch("http://localhost:5000/usuario");

        let corpo = await response.json();
        //Muda o estado da lista com o corpo da requisição e faz a interface se re-renderizar
        setLista(corpo);
        //console.log(corpo)
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Página de Usuários</h1>

            <div className="mb-3">
                <Link
                    href="/admin/usuarios/cadastrar"
                    className="btn btn-success"
                >
                    <i className="fas fa-plus me-2"></i>
                    Novo Usuário
                </Link>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Ativo</th>
                        <th>Perfil</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map((value, index) => (
                            <tr key={index}>
                                <td>{value.id}</td>
                                <td>{value.nome}</td>
                                <td>{value.email}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            value.ativo == 1
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                    >
                                        {value.ativo == 1 ? "Sim" : "Não"}
                                    </span>
                                </td>
                                <td>{value.perfil.id}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm me-2">
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
