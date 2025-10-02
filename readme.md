Fullstack 2 segundo bimestre
react

criar projeto com next
npx create-next-app@latest ->AppRouter e Turbopack

iniciar projeto
npm run dev

rotas devem ficar dentro da pasta app

rotas em react sao representadas pela nomenclatura pages.jsx, cada page deve ficar dentro de sua determinada pasta que indicara seu endpoint
ex:
aula/ <- Acessara a page dentro desta rota

Podem ter mais subpastas dentro dela e para acessar so dividir por /
aula/dia10/ <- Acessara a page dentro desta subrota

estrutura

export default function Page(){

    codigo js

    return <div>
        construção da interface
        <h1>Ola mundo</h1>
    </div>
}

funçoes de navegador nao funcionam por padrao no next para resolver devemos usar a diretiva 'use client'