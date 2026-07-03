import AppError from "@shared/errors/AppError";
import JogosRepository from "../typeorm/repositories/JogosRepository";
import Jogo from "../typeorm/entities/Jogo";

interface IRequest {
    id: string;
}

export default class ShowJogoService {
    public async execute({ id }: IRequest): Promise<Jogo> {
        const jogosRepository = new JogosRepository();
        
        const jogo = await jogosRepository.findOneBy({ id });

        if (!jogo) {
            throw new AppError("Jogo não encontrado.");
        }

        return jogo;
    }
}
