import AppError from "@shared/errors/AppError";
import EstudiosRepository from "../typeorm/repositories/EstudiosRepository";

interface IRequest {
    id: string;
}

export default class DeleteEstudioService {
    public async execute({ id }: IRequest): Promise<void> {
        const estudiosRepository = new EstudiosRepository();
        
        const estudio = await estudiosRepository.findOneBy({ id });

        if (!estudio) {
            throw new AppError("Estudio não encontrado.");
        }

        await estudiosRepository.remove(estudio);
    }
}
