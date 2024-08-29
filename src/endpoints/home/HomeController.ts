import { Request, Response } from 'express';

export class HomeController {
  public get(req: Request, res: Response): void {
    res.status(200).json({
      success: true,
      data: 'Tudo certo por aqui meu chapa...',
    });
  }
}
