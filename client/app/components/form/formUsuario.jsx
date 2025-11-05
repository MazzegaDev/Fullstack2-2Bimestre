'use client'
import { apiClient } from "@/utils/apiClient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import toast, {Toaster} from "react-hot-toast";

export default function FormUsuario() {
    const [lista, setLista] = useState([]);

    const router = useRouter;

    useEffect(()=>{
        buscaPerfil();
    }, [])

    async function buscaPerfil(){
        const response = await fetch("http://localhost:5000/perfil");
        const corpo = await response.json();
        setLista(corpo);
    }

    const nomeR = useRef("");
    const emailR = useRef("");
    const senhaR = useRef("");
    const perfilR = useRef(0);
    const ativoR = useRef(false);

    async function gravar() {
        if(!nomeR.current.value && emailR.current.value && senhaR.current.value && perfilR.current.value && ativoR.current.value){
            //erro
            return toast.error("Dados invalidos")
        }

        let obj = {
            nome: nomeR.current.value,
            email: emailR.current.value,
            senha: senhaR.current.value,
            ativo: ativoR.current.checked,
            perfil:{
                id: perfilR.current.value
            }
        }

        let response = await apiClient.post("/usuario", obj);
        if(!response){
            //erro
            return toast.error("Erro ao cadastrar usuario.")
        }
        
        toast.success("Usuario cadastrado!")
        router.replace("/usuarios/admin/")

    }

  

    return (
        <div>
            <Toaster/>
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
                <select ref={perfilR}  className="form-control">
                    <option> --Selecione-- </option>
                    {
                        lista.map((value, index)=>{
                            return <option key={index} value={value.id}>{value.descricao}</option>

                        })
                    }
                </select>
            </div>
            <div>
                <label><input ref={ativoR} type="checkbox"/>Ativo</label>
            </div>
            <div>
                <button onClick={gravar} className="btn btn-primary"><i className="fas fa-check"></i>Gravar</button>
                <Link className="btn btn-secondary" href="/admin/usuarios/">Voltar</Link>
            </div>
        </div>
    );
}
