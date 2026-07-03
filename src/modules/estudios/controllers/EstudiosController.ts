import { Request, Response, NextFunction } from 'express';
import CreateEstudioService from '../services/CreateEstudioService';
import DeleteEstudioService from '../services/DeleteEstudioService';
import ListEstudiosService from '../services/ListEstudiosService';
import ShowEstudioService from '../services/ShowEstudioService';
import UpdateEstudioService from '../services/UpdateEstudioService';

export default class EstudiosController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listEstudios = new ListEstudiosService();
            const estudios = await listEstudios.execute();
            return response.json(estudios);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const showEstudio = new ShowEstudioService();
            const estudio = await showEstudio.execute({ id });
            return response.json(estudio);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { nome, pais, ano_fundacao, fundador, website } = request.body;
            const createEstudio = new CreateEstudioService();
            const estudio = await createEstudio.execute({
                nome,
                pais,
                ano_fundacao,
                fundador,
                website,
            });
            return response.status(201).json(estudio);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const { nome, pais, ano_fundacao, fundador, website } = request.body;
            const updateEstudio = new UpdateEstudioService();
            const estudio = await updateEstudio.execute({
                id,
                nome,
                pais,
                ano_fundacao,
                fundador,
                website,
            });
            return response.json(estudio);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = request.params.id as string;
            const deleteEstudio = new DeleteEstudioService();
            await deleteEstudio.execute({ id });
            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
