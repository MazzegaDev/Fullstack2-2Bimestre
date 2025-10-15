//Props sao usadas para passar valores de um componente para o outro
export default function RenderPokemon(props){
    return (
        <li key={props.index}>
                    <span>{props.value.nome} - {props.value.tipo}</span>
                    <button onClick={() => props.excluir(props.value.id)}>Excluir</button>
                    {/*Tabem é possivel passar funções como props */}
        </li>
    )
}