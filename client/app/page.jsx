'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { apiClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";

export default function Home() {

  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    carregarImoveis();
  }, [])


  async function carregarImoveis() {
    let response = await apiClient.get("/imovel");
    if(response) {
      console.log(response);
      setImoveis(response);
    }
  }

  return (
    <div>
      <h1>Imóveis disponíveis para locação!</h1>

      <div>
        {
          imoveis.map((value, index) => {
            return <div className="card" style={{width: '18rem'}}>
                      <img src="https://ofuxico.com.br/img/upload/noticias/2018/01/18/celso-portiolli-mostra-mansao-de-larissa-manoela-nos-eua-nota_311766_36.jpg"></img>
                      <div className="card-body">
                        <div className="card-title">
                          {value.descricao}
                        </div>
                        <div className="card-text">
                          <p>{value.endereco}</p>
                          <p>{value.cidade}</p>
                          <p>R$ {value.valor}</p>
                        </div>
                        <button className="btn btn-primary">
                          Alugar
                        </button>
                      </div>
                  </div>
          })
        }
      </div>
    </div>
  );
}
