import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import Jogo from '../../../jogos/typeorm/entities/Jogo';

@Entity('estudios')
export default class Estudio {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    pais: string;

    @Column('int')
    ano_fundacao: number;

    @Column()
    fundador: string;

    @Column()
    website: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Jogo, jogo => jogo.estudio)
    jogos: Jogo[];
}
