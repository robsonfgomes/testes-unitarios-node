import { IUser } from '../../interfaces/IUser';
import * as fs from 'fs';
import * as path from 'path';

export class UserRepository {
  private filePath = path.join(__dirname, 'users.json');

  /**
   * Lista os usuários cadastrados no sistema
   *
   * @returns a lista de usuários cadastrados
   */
  public list(): IUser[] {
    return this.readFromFile();
  }

  /**
   * Busca um usuário específico
   *
   * @param id ID do usuário
   * @returns o usuário encontrado ou undefined caso contrário
   */
  public findOne(id: number): IUser | undefined {
    const users = this.readFromFile();
    return users.find((user) => user.id === id);
  }

  /**
   * Salva o usuário informado
   *
   * @param userData Dados usuários
   * @returns boolean contendo o resultado da operação
   */
  public save(userData: IUser): boolean {
    const users = this.readFromFile();
    const userExists = users.some((user) => user.id === userData.id);

    // Vefifica se o id do usuário informado já existe
    if (userExists) return false;

    // Vefifica se os dados informados são válidos
    if (!this.isValidUserData(userData)) return false;

    users.push(userData);
    this.writeToFile(users);
    return true;
  }

  /**
   * Remove um usuário do sistema
   *
   * @param id ID do usuário
   * @returns boolean contendo o resultado da operação
   */
  public delete(id: number): boolean {
    let users = this.readFromFile();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users = users.filter((user) => user.id !== id);
    this.writeToFile(users);
    return true;
  }

  /**
   * Carrega os usuários cadastrados do arquivos json
   *
   * @returns a lista de usuários disponíveis no sistema
   */
  private readFromFile(): IUser[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  /**
   * Salva a lista de usuários informada no arquivo json
   *
   * @param users lista de usuários
   */
  private writeToFile(users: IUser[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  /**
   * Checa se os dados do usuário informado são válidos
   *
   * @param userData dados do usuário
   * @returns boolean contendo o resultado da operação
   */
  private isValidUserData(userData: IUser): boolean {
    const requiredAttributes: Array<keyof IUser> = ['id', 'name', 'age'];

    // Verifica se todos os atributos obrigatórios estão presentes
    for (const attribute of requiredAttributes) {
      if (!userData.hasOwnProperty(attribute)) {
        return false;
      }
    }

    // Verifica se não existem atributos adicionais no objeto
    const userDataAttributes = Object.keys(userData) as Array<keyof IUser>;
    if (userDataAttributes.length !== requiredAttributes.length) {
      return false;
    }

    return true;
  }
}
