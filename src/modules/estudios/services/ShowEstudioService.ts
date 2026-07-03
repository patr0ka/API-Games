import AppError from "@shared/errors/AppError";
import EstudiosRepository from "../typeorm/repositories/EstudiosRepository";
import Estudio from "../typeorm/entities/Estudio";

interface IRequest {
    id: string;
}

export default class ShowEstudioService {
    public async execute({ id }: IRequest): Promise<Estudio> {
        const estudiosRepository = new EstudiosRepository();
        const estudio = await estudiosRepository.findOneBy({ id });

        if (!estudio) {
            throw new AppError("Estudio não encontrado.");
        }

        return estudio;
    }
}
