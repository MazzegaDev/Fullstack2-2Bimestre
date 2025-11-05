"use client";
import { apiClient } from "@/utils/apiClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FormUsuario({ encontrado }) {
    const [lista, setLista] = useState([]);
    // const [usuarioEncontrado, setUsuario] = useState({})
    const router = useRouter;

    const nomeR = useRef("");
    const emailR = useRef("");
    const senhaR = useRef("");
    const perfilR = useRef(0);
    const ativoR = useRef(false);

    useEffect(() => {
        if (encontrado) {
            nomeR.current.value = encontrado.nome;
            emailR.current.value = encontrado.email;
            senhaR.current.value = encontrado.senha;
            perfilR.current.value = encontrado.perfil.id;
            ativoR.current.checked = encontrado.ativo;
        }
        buscaPerfil();
    }, []);

    /*
        Como falar para o componente que é um update?
        1 - passar o id como do usuario como prop
        2 - verificar se o id veio
        3 - se veio é put
        4 - se nao é post
    */
    async function alterar() {
        if (
            nomeR.current.value != "" &&
            emailR.current.value != "" &&
            senhaR.current.value != "" &&
            perfilR.current.value != "" &&
            ativoR.current.value != ""
        ) {
            let obj = {
                id: encontrado.id,
                nome: nomeR.current.value,
                email: emailR.current.value,
                senha: senhaR.current.value,
                ativo: ativoR.current.checked,
                perfil: {
                    id: perfilR.current.value,
                },
            };
            let response = apiClient.put("/usuario/", obj)
            if(response){
                toast.success("Usuario alterado");
            }
        }
    }

    useEffect(() => {
        buscaPerfil();
        console.log("Encontrado form" + encontrado);
    }, []);
    async function buscaPerfil() {
        const response = await fetch("http://localhost:5000/perfil");
        const corpo = await response.json();
        setLista(corpo);
    }

    async function gravar() {
        if (
            !nomeR.current.value &&
            emailR.current.value &&
            senhaR.current.value &&
            perfilR.current.value &&
            ativoR.current.value
        ) {
            //erro
            return toast.error("Dados invalidos");
        }

        let obj = {
            nome: nomeR.current.value,
            email: emailR.current.value,
            senha: senhaR.current.value,
            ativo: ativoR.current.checked,
            perfil: {
                id: perfilR.current.value,
            },
        };

        let response = await apiClient.post("/usuario", obj);
        if (!response) {
            //erro
            return toast.error("Erro ao cadastrar usuario.");
        }

        toast.success("Usuario cadastrado!");
        router.replace("/usuarios/admin/");
    }

    return (
        <div>
            <Toaster />
            <div className="form-group">
                <label>Nome:</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    className="form-control"
                    ref={nomeR}
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="text"
                    name="Email"
                    id="Email"
                    className="form-control"
                    ref={emailR}
                />
            </div>
            <div className="form-group">
                <label>Senha:</label>
                <input
                    type="password"
                    name="Senha"
                    id="Senha"
                    ref={senhaR}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Perfil:</label>
                <select ref={perfilR} className="form-control">
                    <option> --Selecione-- </option>
                    {lista.map((value, index) => {
                        return (
                            <option key={index} value={value.id}>
                                {value.descricao}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label>
                    <input ref={ativoR} type="checkbox" />
                    Ativo
                </label>
            </div>
            <div>
                {/* se a função de alterar existir ela que sera chamada, se não é um case de alterar */}
                <button
                    onClick={alterar ? alterar : gravar}
                    className="btn btn-primary"
                >
                    <i className="fas fa-check"></i>
                    {alterar ? "Alterar" : "Gravar"}
                </button>
                <Link className="btn btn-secondary" href="/admin/usuarios/">
                    Voltar
                </Link>
            </div>
        </div>
    );
}
