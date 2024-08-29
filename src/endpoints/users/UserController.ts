import { IUserResponse } from './../../interfaces/IUserResponse';
import { Request, Response } from 'express';
import { UserRepository } from './userRepository';
import { IUser } from '../../interfaces/IUser';

export class UserController {
  public list(req: Request, res: Response): void {
    const users = new UserRepository().list();
    const usersResponse: IUserResponse[] = [];

    users.forEach((user: IUser) => {
      usersResponse.push({
        ...user,
        isOfAge: user.age >= 18,
      });
    });

    res.status(200).json({
      success: true,
      data: usersResponse,
    });
  }

  public getOne(req: Request, res: Response): void {
    const user: IUser | undefined = new UserRepository().findOne(Number(req.params.id));

    if (!user) {
      res.status(404).json({
        success: false,
        data: 'Usuário não encontrado',
      });
      return;
    }

    const userResponse: IUserResponse = {
      ...user,
      isOfAge: user.age >= 18,
    };

    res.status(200).json({
      success: true,
      data: userResponse,
    });
  }

  public create(req: Request, res: Response): void {
    const userData: IUser = { ...req.body };
    const result = new UserRepository().save(userData);

    if (!result) {
      res.status(500).json({
        success: false,
        data: 'Falha ao criar o usuário',
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: 'Usuário criado com sucesso',
    });
  }

  public delete(req: Request, res: Response): void {
    const result = new UserRepository().delete(Number(req.params.id));

    if (!result) {
      res.status(500).json({
        success: false,
        data: 'Falha ao remover o usuário',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: 'Usuário excluído com sucesso',
    });
  }
}
