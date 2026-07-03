import EstudiosRepository from "../typeorm/repositories/EstudiosRepository";
import Estudio from "../typeorm/entities/Estudio";

export default class ListEstudiosService {
    public async execute(): Promise<Estudio[]> {
        const estudiosRepository = new EstudiosRepository();
        return estudiosRepository.find();
    }
}
