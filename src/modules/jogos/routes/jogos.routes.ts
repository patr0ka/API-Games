import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import JogosController from '../controllers/JogosController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const jogosRouter = Router();
const jogosController = new JogosController();

jogosRouter.use(isAuthenticated);

jogosRouter.get('/', async (req, res, next) => {
    try {
        await jogosController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

jogosRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), isAuthenticated, async (req, res, next) => {
    try {
        await jogosController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

const parseDate = (value: string, helpers: any) => {
    const match = value.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
    if (!match) {
        return helpers.message({ custom: 'A data de lançamento deve estar no formato DD/MM/YYYY ou DD-MM-YYYY' });
    }
    const [, dia, mes, ano] = match;
    const date = new Date(`${ano}-${mes}-${dia}T12:00:00Z`);
    if (isNaN(date.getTime())) {
        return helpers.message({ custom: 'Data de lançamento inválida' });
    }
    return date;
};

jogosRouter.post('/', celebrate({
    [Segments.BODY]: {
        titulo: Joi.string().required(),
        genero: Joi.string().required(),
        data_lancamento: Joi.string().custom(parseDate).required(),
        plataforma: Joi.string().required(),
        preco: Joi.number().precision(2).required(),
        estudio_id: Joi.string().uuid().required()
    },
}), isAuthenticated, async (req, res, next) => {
    try {
        await jogosController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

jogosRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
        titulo: Joi.string().required(),
        genero: Joi.string().required(),
        data_lancamento: Joi.string().custom(parseDate).required(),
        plataforma: Joi.string().required(),
        preco: Joi.number().precision(2).required(),
        estudio_id: Joi.string().uuid().required()
    },
}), async (req, res, next) => {
    try {
        await jogosController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

jogosRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
}), async (req, res, next) => {
    try {
        await jogosController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default jogosRouter;
