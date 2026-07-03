import AppError from "@shared/errors/AppError";
import JogosRepository from "../typeorm/repositories/JogosRepository";

interface IRequest {
    id: string;
}

export default class DeleteJogoService {
    public async execute({ id }: IRequest): Promise<void> {
        const jogosRepository = new JogosRepository();
        
        const jogo = await jogosRepository.findOneBy({ id });

        if (!jogo) {
            throw new AppError("Jogo não encontrado.");
        }

        await jogosRepository.remove(jogo);
    }
}
