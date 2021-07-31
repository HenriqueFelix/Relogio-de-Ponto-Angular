import { Contato } from "./contato";

export class Usuario {
    public id: number;
    public login: string;
    public senha: string;
    public senha_confirm: string;
    public cpf: string;
    public nome: string;
    public contatos: Array<Contato>;
}
