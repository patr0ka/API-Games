import { AppDataSource } from "@shared/typeorm/data-source";
import { Repository } from "typeorm";
import Jogo from "../entities/Jogo";

export default class JogosRepository {
    private ormRepository: Repository<Jogo>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Jogo);
    }

    public async findByTitulo(titulo: string): Promise<Jogo | null> {
        const jogo = await this.ormRepository.findOne({
            where: { titulo },
        });

        return jogo;
    }

    public async create(data: Partial<Jogo>): Promise<Jogo> {
        const jogo = this.ormRepository.create(data);
        await this.ormRepository.save(jogo);
        return jogo;
    }

    public async find(): Promise<Jogo[]> {
        return this.ormRepository.find({ relations: { estudio: true } });
    }

    public async findOneBy(criteria: any): Promise<Jogo | null> {
        return this.ormRepository.findOne({ where: criteria, relations: { estudio: true } });
    }

    public async save(jogo: Jogo): Promise<Jogo> {
        return this.ormRepository.save(jogo);
    }

    public async remove(jogo: Jogo): Promise<void> {
        await this.ormRepository.remove(jogo);
    }
}
