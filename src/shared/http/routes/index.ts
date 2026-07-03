import { Router } from "express";
import estudiosRouter from "@modules/estudios/routes/estudios.routes";
import jogosRouter from "@modules/jogos/routes/jogos.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";

const routes = Router();

routes.use('/estudios', estudiosRouter);
routes.use('/jogos', jogosRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) => {
    response.json({ message: 'Hello Dev!' });
    return;
});

export default routes;
