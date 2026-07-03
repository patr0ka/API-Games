import AppError from "@shared/errors/AppError";
import EstudiosRepository from "../typeorm/repositories/EstudiosRepository";
import Estudio from "../typeorm/entities/Estudio";

interface IRequest {
    id: string;
    nome: string;
    pais: string;
    ano_fundacao: number;
    fundador: string;
    website: string;
}

export default class UpdateEstudioService {
    public async execute({ id, nome, pais, ano_fundacao, fundador, website }: IRequest): Promise<Estudio> {
        const estudiosRepository = new EstudiosRepository();
        
        const estudio = await estudiosRepository.findOneBy({ id });

        if (!estudio) {
            throw new AppError("Estudio not found.");
        }

        const estudioExists = await estudiosRepository.findByName(nome);

        if (estudioExists && estudioExists.id !== id) {
            throw new AppError("Já tem um estudio com esse nome.");
        }

        estudio.nome = nome;
        estudio.pais = pais;
        estudio.ano_fundacao = ano_fundacao;
        estudio.fundador = fundador;
        estudio.website = website;

        await estudiosRepository.save(estudio);

        return estudio;
    }
}
