import AppError from "@shared/errors/AppError";
import JogosRepository from "../typeorm/repositories/JogosRepository";
import EstudiosRepository from "../../estudios/typeorm/repositories/EstudiosRepository";
import Jogo from "../typeorm/entities/Jogo";

interface IRequest {
    id: string;
    titulo: string;
    genero: string;
    data_lancamento: Date;
    plataforma: string;
    preco: number;
    estudio_id: string;
}

export default class UpdateJogoService {
    public async execute({ id, titulo, genero, data_lancamento, plataforma, preco, estudio_id }: IRequest): Promise<Jogo> {
        const jogosRepository = new JogosRepository();
        const estudiosRepository = new EstudiosRepository();
        
        const jogo = await jogosRepository.findOneBy({ id });

        if (!jogo) {
            throw new AppError("Jogo não encontrado.");
        }

        const estudioExists = await estudiosRepository.findOneBy({ id: estudio_id });

        if (!estudioExists) {
            throw new AppError("Estudio não encontrado.");
        }

        const jogoExists = await jogosRepository.findByTitulo(titulo);

        if (jogoExists && jogoExists.id !== id) {
            throw new AppError("Já tem um jogo com esse nome.");
        }

        jogo.titulo = titulo;
        jogo.genero = genero;
        jogo.data_lancamento = data_lancamento;
        jogo.plataforma = plataforma;
        jogo.preco = preco;
        jogo.estudio_id = estudio_id;

        await jogosRepository.save(jogo);

        return jogo;
    }
}
