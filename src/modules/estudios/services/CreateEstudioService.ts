import AppError from "@shared/errors/AppError";
import EstudiosRepository from "../typeorm/repositories/EstudiosRepository";
import Estudio from "../typeorm/entities/Estudio";

interface IRequest {
    nome: string;
    pais: string;
    ano_fundacao: number;
    fundador: string;
    website: string;
}

export default class CreateEstudioService {
    public async execute({ nome, pais, ano_fundacao, fundador, website }: IRequest): Promise<Estudio> {
        const estudiosRepository = new EstudiosRepository();

        const estudioExists = await estudiosRepository.findByName(nome);

        if (estudioExists) {
            throw new AppError("There is already one estudio with this name.");
        }

        const estudio = await estudiosRepository.create({
            nome,
            pais,
            ano_fundacao,
            fundador,
            website,
        });

        return estudio;
    }
}
