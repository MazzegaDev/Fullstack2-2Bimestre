'use client'
import { apiClient } from "@/utils/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function FormUsuario({usuario}) {

    const [perfis, setPerfis] = useState([]);
    const [alteracao, setAlteracao] = useState(false);

    const nome = useRef();
    const email = useRef();
    const senha = useRef();
    const perfil = useRef(0);
    const ativo = useRef(false);

    const router = useRouter();

    useEffect(() => {
        carregarPerfis();
        setTimeout(() => {
            if(usuario) {
                nome.current.value = usuario.nome;
                email.current.value = usuario.email;
                senha.current.value = usuario.senha;
                perfil.current.value = usuario.perfil.id;
                ativo.current.checked = usuario.ativo;

                setAlteracao(true);
        }
        }, 500)

        
    }, [])

    async function gravar() {
        if(nome.current.value != "" && email.current.value != "" && senha.current.value != "" && perfil.current.value != "0" ) {

            let obj = {
                nome: nome.current.value,
                email: email.current.value,
                senha: senha.current.value,
                ativo: ativo.current.checked,
                perfil: {
                    id: perfil.current.value
                }
            }

            let response = apiClient.post("/usuario", obj);
            if(response) {
                //exibir mensagem de sucesso
                toast.success("Usuário cadastrado!");

                // redireciona para a listagem
                router.replace("/admin/usuarios");
            }
        }
        else {
            // exibir mensagem de erro
            toast.error("Preencha os campos corretamente");
        }
    }

    async function alterar() {

        //faz a chamada para o endpoint de alteração
        if(usuario.id && nome.current.value != "" && email.current.value != "" && senha.current.value != "" && perfil.current.value != "0" ) {

            let obj = {
                id: usuario.id,
                nome: nome.current.value,
                email: email.current.value,
                senha: senha.current.value,
                ativo: ativo.current.checked,
                perfil: {
                    id: perfil.current.value
                }
            }

            let response = apiClient.put("/usuario", obj);
            if(response) {
                //exibir mensagem de sucesso
                toast.success("Usuário alterado!");

                // redireciona para a listagem
                router.replace("/admin/usuarios");
            }
        }
        else {
            // exibir mensagem de erro
            toast.error("Preencha os campos corretamente");
        }
    }

    async function carregarPerfis() {
        
        const perfis = await apiClient.get("/perfil");
        setPerfis(perfis);
    }

    return (
        <div>
            <div className="form-group">
                <label>Nome:</label>
                <input ref={nome} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input ref={email} type="email" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Senha:</label>
                <input ref={senha} className="form-control" type="password"></input>
            </div>
            <div className="form-group">
                <label>Perfil:</label>
                <select ref={perfil} className="form-control">
                    <option value="0"> -- Selecione --</option>
                    {
                        perfis.map((value, index) => {
                            return <option key={index} value={value.id}>{value.descricao}</option>
                        })
                    }
                </select>
            </div>
            <div>
                <label><input ref={ativo} type="checkbox"></input> Ativo</label>
            </div>

            <div>
                <button onClick={alteracao ? alterar : gravar} className="btn btn-primary"><i className="fas fa-check"></i>{alteracao ? "Alterar" : "Gravar"}</button>
                <Link href="/admin/usuarios" className="btn btn-default">Voltar</Link>
            </div>
        </div>
    )
}