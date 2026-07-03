import AppError from "@shared/errors/AppError";
import JogosRepository from "../typeorm/repositories/JogosRepository";
import EstudiosRepository from "../../estudios/typeorm/repositories/EstudiosRepository";
import Jogo from "../typeorm/entities/Jogo";

interface IRequest {
    titulo: string;
    genero: string;
    data_lancamento: Date;
    plataforma: string;
    preco: number;
    estudio_id: string;
}

export default class CreateJogoService {
    public async execute({ titulo, genero, data_lancamento, plataforma, preco, estudio_id }: IRequest): Promise<Jogo> {
        const jogosRepository = new JogosRepository();
        const estudiosRepository = new EstudiosRepository();

        const estudioExists = await estudiosRepository.findOneBy({ id: estudio_id });

        if (!estudioExists) {
            throw new AppError('Estudio não encontrado.');
        }

        const jogoExists = await jogosRepository.findByTitulo(titulo);

        if (jogoExists) {
            throw new AppError('Já tem um jogo com esse nome.');
        }

        const jogo = await jogosRepository.create({
            titulo,
            genero,
            data_lancamento,
            plataforma,
            preco,
            estudio_id
        });

        return jogo;
    }
}
