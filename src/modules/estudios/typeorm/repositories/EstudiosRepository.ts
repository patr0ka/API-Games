import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import Estudio from "../entities/Estudio";

export default class EstudiosRepository {
    private ormRepository: Repository<Estudio>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Estudio);
    }

    public async findByName(nome: string): Promise<Estudio | null> {
        const estudio = await this.ormRepository.findOne({
            where: { nome },
        });

        return estudio;
    }

    public async create(data: Partial<Estudio>): Promise<Estudio> {
        const estudio = this.ormRepository.create(data);
        await this.ormRepository.save(estudio);
        return estudio;
    }

    public async find(): Promise<Estudio[]> {
        return this.ormRepository.find();
    }

    public async findOneBy(criteria: any): Promise<Estudio | null> {
        return this.ormRepository.findOneBy(criteria);
    }

    public async save(estudio: Estudio): Promise<Estudio> {
        return this.ormRepository.save(estudio);
    }

    public async remove(estudio: Estudio): Promise<void> {
        await this.ormRepository.remove(estudio);
    }
}
