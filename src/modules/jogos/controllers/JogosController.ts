import { Request, Response, NextFunction } from 'express';
import CreateJogoService from '../services/CreateJogoService';
import DeleteJogoService from '../services/DeleteJogoService';
import ListJogosService from '../services/ListJogosService';
import ShowJogoService from '../services/ShowJogoService';
import UpdateJogoService from '../services/UpdateJogoService';

export default class JogosController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listJogos = new ListJogosService();
            const jogos = await listJogos.execute();
            return response.json(jogos);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showJogo = new ShowJogoService();
            const jogo = await showJogo.execute({ id });
            return response.json(jogo);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { titulo, genero, data_lancamento, plataforma, preco, estudio_id } = request.body;
            const createJogo = new CreateJogoService();
            const jogo = await createJogo.execute({
                titulo,
                genero,
                data_lancamento,
                plataforma,
                preco,
                estudio_id
            });
            return response.status(201).json(jogo);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { titulo, genero, data_lancamento, plataforma, preco, estudio_id } = request.body;
            const updateJogo = new UpdateJogoService();
            const jogo = await updateJogo.execute({
                id,
                titulo,
                genero,
                data_lancamento,
                plataforma,
                preco,
                estudio_id
            });
            return response.json(jogo);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deleteJogo = new DeleteJogoService();
            await deleteJogo.execute({ id });
            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
