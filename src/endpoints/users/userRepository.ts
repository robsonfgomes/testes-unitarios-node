import { IUser } from '../../interfaces/IUser';
import * as fs from 'fs';
import * as path from 'path';

export class UserRepository {
  private filePath = path.join(__dirname, 'users.json');

  private readFromFile(): IUser[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeToFile(users: IUser[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2), 'utf-8');
  }

  public list(): IUser[] {
    return this.readFromFile();
  }

  public findOne(id: number): IUser | undefined {
    const users = this.readFromFile();
    return users.find((user) => user.id === id);
  }

  public save(userData: IUser): boolean {
    const users = this.readFromFile();
    const userExists = users.some((user) => user.id === userData.id);

    if (userExists) return false;

    users.push(userData);
    this.writeToFile(users);
    return true;
  }

  public delete(id: number): boolean {
    let users = this.readFromFile();
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    users = users.filter((user) => user.id !== id);
    this.writeToFile(users);
    return true;
  }
}
