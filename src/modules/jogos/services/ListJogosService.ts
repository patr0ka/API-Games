import JogosRepository from "../typeorm/repositories/JogosRepository";
import Jogo from "../typeorm/entities/Jogo";

export default class ListJogosService {
    public async execute(): Promise<Jogo[]> {
        const jogosRepository = new JogosRepository();
        
        const jogos = await jogosRepository.find();

        return jogos;
    }
}
