"use client";

import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ImoveisPage() {
    const [lista, setLista] = useState([]);

    async function listar() {
        const response = await apiClient.get("/imovel");
        if (response) {
            console.log(response);
            setLista(response);
        }
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <div>
            <h1>Imóveis cadastrados</h1>
            <br></br>
            <Link href="/admin/imoveis/cadastrar" className="btn btn-primary">
                <i className="fas fa-plus"></i> Cadastrar imóvel
            </Link>
            <br></br>
            <br></br>
            <div className="grid-imovel">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>CEP</th>
                            <th>Cidade</th>
                            <th>Endereco</th>
                            <th>Valor</th>
                            <th>Disponivel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((obj, index) => {
                            return (
                                <tr key={index}>
                                    <td>{obj.descricao}</td>
                                    <td>{obj.cep}</td>
                                    <td>{obj.cidade}</td>
                                    <td>{obj.endereco}</td>
                                    <td>{obj.valor}</td>
                                    <td>{obj.disponivel ? "Sim" : "Não"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
