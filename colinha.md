Respondendo a eventos

para reponder a eventos precisamos de um eventHadler
EventHandler são funções que lidam com um evento, por exemplo de clique

Exemplo

function MyButton(){
    function HandleClick(){
        alert("Fui clicado");
    }

    Observe que em react utilizamos chaves para referenciar botoes
    return(
        <button onClick={HandleClick}> Em React não utilize os () para executar a função handler, isso pode causar comportamento indevido
            clique aqui
        </button>
    )
}

Atualizando a tela

Para atualizar algo na tela de sua pagina precissamos usar estados em nossos componentes.
Primeiro importe

import { useState } from 'react';

Agora podemos usar isso para alterar o estado de algum elemento em tela

function MyButton(){

    lembresse de importar os states
    const [count, setCount] = useState(0) <- (0) Valor padrão
        
    count -> É o nome da variavel cujo queremos mudar o 'estado'
    setCount -> É o manipulador de estado da variavel

    function HandleClick(){
        setCount(count + 1);
        O setCount esta utilizando o valor de count e esta somando mais um a ele
    }


    return(
        <button onClick={HandleClick}>
            clique aqui
        </button>
    )
}

Podemos ter tambem varios componentes MyButton dentro de nossa pagina princiapal e cada um vai ter seu proprio estado.

Usando Hooks

Hooks são funções que começam com use, então o useState é um hook do react, hooks sao mais restritivos que funções e devem ser chamados no topo de sua aplicação.
Podemos tambem criar nossos proprios hooks

Compartilhando dados entre componentes:

Para fazer que os dois botoes se alterem e recebam o mesmo estado ao click precissamos fazer um state lift, ou seja levar o estado do componente.
Isso é feito com uso de props, chamamos o componente botao na nossa função principal e passamos valores a ela.
Esses valores sao parecidos com atributos ou seja, chave e valor, outro detalhe é que nossa função handler tem que ficar no topo do arquivo abaixo do useState.

Vamos a um exemplo disso.

import { useState } from 'react';

export default function MyApp(){
    const [ count, setCount ] = useState(0);
    
    //Aqui damos inicio ao state lift
    function handleClick(){
        setCount(count + 1);
    }

    //Perceba que aqui é o return do nosso componente princial, o componente principal tem export default em seu inicio
    return(
        <div>
            <h1>Clique aqui</h1>
            <MyButton count={count} onClick={handleClick}>
            <MyButton count={count} onClick={handleClick}>
        </div>
    )

    //Agora no componente MyButton recebemos as props que passamos em sua chamada
    function MyButton({count, onClick}){
        return(
            <button onClick={onClick}>
                Fui clidado {count} vezes
            </button>
        )
    }
}

Pensando em React
O React pode mudar a forma como você pensa sobre os designs que observa e as aplicações que constrói. Quando você constrói uma interface de usuário com React, primeiro você a dividirá em partes chamadas componentes. Em seguida, você descreverá os diferentes estados visuais para cada um dos seus componentes. Finalmente, você conectará seus componentes para que os dados fluam através deles. Neste tutorial, nós o guiaremos através do processo de pensamento de construir uma tabela de dados de produtos pesquisável com React.

Para implementar uma UI em React, você geralmente seguirá os mesmos cinco passos.

Passo 1: Divida a UI em uma hierarquia de componentes 
Comece desenhando caixas ao redor de cada componente e subcomponente no mockup e nomeando-os. Se você trabalha com um designer, eles podem já ter nomeado esses componentes em sua ferramenta de design. Pergunte a eles!

Dependendo do seu background, você pode pensar sobre dividir um design em componentes de diferentes maneiras:

Programação—use as mesmas técnicas para decidir se você deve criar uma nova função ou objeto. Uma dessas técnicas é o princípio da responsabilidade única, ou seja, um componente deve idealmente fazer apenas uma coisa. Se ele acabar crescendo, deve ser decomposto em subcomponentes menores.
CSS—considere para o que você faria seletores de classe. (No entanto, os componentes são um pouco menos granulares.)
Design—considere como você organizaria as camadas do design.
Se seu JSON está bem estruturado, você frequentemente descobrirá que ele mapeia naturalmente para a estrutura de componentes de sua UI. Isso ocorre porque UI e modelos de dados frequentemente têm a mesma arquitetura de informação—ou seja, a mesma forma. Separe sua UI em componentes, onde cada componente corresponde a uma parte do seu modelo de dados.

FilterableProductTable (cinza) contém toda a aplicação.
SearchBar (azul) recebe a entrada do usuário.
ProductTable (lavanda) exibe e filtra a lista de acordo com a entrada do usuário.
ProductCategoryRow (verde) exibe um cabeçalho para cada categoria.
ProductRow (amarelo) exibe uma linha para cada produto.
Se você olhar para ProductTable (lavanda), verá que o cabeçalho da tabela (contendo os rótulos “Name” e “Price”) não é seu próprio componente. Esta é uma questão de preferência, e você pode ir de qualquer forma. Para este exemplo, é parte de ProductTable porque aparece dentro da lista de ProductTable. No entanto, se este cabeçalho crescer para ser complexo (por exemplo, se você adicionar ordenação), você pode movê-lo para seu próprio componente ProductTableHeader.

Agora que você identificou os componentes no mockup, organize-os em uma hierarquia. Componentes que aparecem dentro de outro componente no mockup devem aparecer como filhos na hierarquia:

FilterableProductTable
SearchBar
ProductTable
ProductCategoryRow
ProductRow

Passo 2: Construa uma versão estática em React 
Agora que você tem sua hierarquia de componentes, é hora de implementar sua aplicação. A abordagem mais direta é construir uma versão que renderiza a UI a partir do seu modelo de dados sem adicionar qualquer interatividade… ainda! É frequentemente mais fácil construir a versão estática primeiro e adicionar interatividade depois. Construir uma versão estática requer muito digitação e nenhum pensamento, mas adicionar interatividade requer muito pensamento e pouca digitação.

Para construir uma versão estática de sua aplicação que renderiza seu modelo de dados, você vai querer construir componentes que reutilizam outros componentes e passam dados usando props. Props são uma forma de passar dados de pai para filho. (Se você está familiarizado com o conceito de state, não use state de forma alguma para construir esta versão estática. State é reservado apenas para interatividade, ou seja, dados that change over time. Como esta é uma versão estática da aplicação, você não precisa dele.)

Você pode construir “de cima para baixo” começando com a construção dos componentes mais altos na hierarquia (como FilterableProductTable) ou “de baixo para cima” trabalhando a partir de componentes mais baixos (como ProductRow). Em exemplos mais simples, é geralmente mais fácil ir de cima para baixo, e em projetos maiores, é mais fácil ir de baixo para cima.

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}