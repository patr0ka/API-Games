import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import Estudio from "../../modules/estudios/typeorm/entities/Estudio";
import Jogo from "../../modules/jogos/typeorm/entities/Jogo";
import User from "../../modules/users/typeorm/entities/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 1234,
    username: "postgres",
    password: "docker",
    database: "studio_jogos_db",
    synchronize: true, // apenas em desenvolvimento
    logging: false,
    entities: [Estudio, Jogo, User],
    migrations: [path.join("src", "shared", "typeorm", "migrations", "*.ts")],
    subscribers: [],
});
