//Essa pagina vai servir de rota para todas as paginas do usuario

export default function PageUser(params) {
    
    return(
        <div>
           { /*Para fazer estilizações inline no react devemos passar como forma de atributo e valor dentro de chaves no style*/}
           {/*Quando queremos fazer estilizações devemos fazer com objetos style={ {color: 'red'} } */}
            <h1 style={{color: 'red'}} >Area usuario</h1>
        </div>
    )
};
''