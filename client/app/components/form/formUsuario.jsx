'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FormUsuario() {
    const [lista, setLista] = useState([]);

    
    useEffect(()=>{
        buscaPerfil();
    }, [])

    async function buscaPerfil(){
        const response = await fetch("http://localhost:5000/perfil");
        const corpo = await response.json();
        setLista(corpo);
    }

    return (
        <div>
            <div className="form-group">
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="text"
                    name="Email"
                    id="Email"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Senha:</label>
                <input
                    type="password"
                    name="Senha"
                    id="Senha"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Perfil:</label>
                <select className="form-control">
                    <option> --Selecione-- </option>
                    {
                        lista.map((value, index)=>{
                            return <option key={index} value={value.perfil}>{value.descricao}</option>

                        })
                    }
                </select>
            </div>
            <div>
                <label><input type="checkbox"/>Ativo</label>
            </div>
            <div>
                <button className="btn btn-primary"><i className="fas fa-check"></i>Gravar</button>
                <Link className="btn btn-secondary" href="/admin/usuarios/">Voltar</Link>
            </div>
        </div>
    );
}
