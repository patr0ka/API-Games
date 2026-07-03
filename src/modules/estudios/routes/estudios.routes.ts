import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import EstudiosController from '../controllers/EstudiosController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const estudiosRouter = Router();
const estudiosController = new EstudiosController();

estudiosRouter.use(isAuthenticated);

estudiosRouter.get('/', async (req, res, next) => {
    try {
        await estudiosController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

estudiosRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), isAuthenticated, async (req, res, next) => {
    try {
        await estudiosController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

estudiosRouter.post('/', celebrate({
    [Segments.BODY]: {
        nome: Joi.string().required(),
        pais: Joi.string().required(),
        ano_fundacao: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        fundador: Joi.string().required(),
        website: Joi.string().uri().required(),
    },
}), isAuthenticated, async (req, res, next) => {
    try {
        await estudiosController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

estudiosRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        nome: Joi.string().required(),
        pais: Joi.string().required(),
        ano_fundacao: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
        fundador: Joi.string().required(),
        website: Joi.string().uri().required(),
    },
}), async (req, res, next) => {
    try {
        await estudiosController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

estudiosRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), async (req, res, next) => {
    try {
        await estudiosController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default estudiosRouter;
