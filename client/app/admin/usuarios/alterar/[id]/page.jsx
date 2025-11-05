'use client'

import FormUsuario from "@/app/components/form/formUsuario";
import { useEffect, useState } from "react";

export default function FormAlterar({params}){

    const [encontrado, setEncontrado] = useState([]);

    const {id} = use(params)

    useEffect(() => {
        
    }, [])

    await function buscarUsers() {
        
    }

    return(
        <div>
            <h1>Alterar</h1>
            <FormUsuario></FormUsuario>
        </div>
    )


}