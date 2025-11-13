import Base from "./base.js";


export default class Imovel extends Base {

    #id;
    #descricao;
    #cep;
    #endereco;
    #bairro;
    #cidade;
    #valor;
    #disponivel;
    #imagens;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    get cep() {
        return this.#cep;
    }
    set cep(value) {
        this.#cep = value;
    }

    get endereco() {
        return this.#endereco;
    }
    set endereco(value) {
        this.#endereco = value;
    }

    get bairro() {
        return this.#bairro;
    }
    set bairro(value) {
        this.#bairro = value;
    }

    get cidade() {
        return this.#cidade;
    }
    set cidade(value) {
        this.#cidade = value;
    }

    get valor() {
        return this.#valor;
    }
    set valor(value) {
        this.#valor = value;
    }

    get disponivel() {
        return this.#disponivel;
    }
    set disponivel(value) {
        this.#disponivel = value;
    }

    get imagens() {
        return this.#imagens;
    }
    set imagens(value) {
        this.#imagens = value;
    }

    constructor(id, descricao, endereco, cep, bairro, cidade, 
        valor, disponivel, imagens) {
        super();
        this.#id = id;
        this.#descricao = descricao;
        this.#endereco = endereco;
        this.#cep = cep;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#valor = valor;
        this.#disponivel = disponivel;
        this.#imagens = imagens;
    }

    validar() {
        if(this.#descricao 
            && this.#endereco 
            && this.#cidade 
            && this.#cep  
            && this.#bairro 
            && this.#valor > 0) {

            let arrEndereco = this.#endereco.split(",");
            if(arrEndereco.length > 0) {
                let numero = arrEndereco[1];
                if(isNaN(numero) == false)
                    return true;
            }
        }

        return false;
    }
}