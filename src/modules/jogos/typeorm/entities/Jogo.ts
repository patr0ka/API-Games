import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import Estudio from '../../../estudios/typeorm/entities/Estudio';

@Entity('jogos')
export default class Jogo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    genero: string;

    @Column('date')
    data_lancamento: Date;

    @Column()
    plataforma: string;

    @Column('decimal')
    preco: number;

    @Column()
    estudio_id: string;

    @ManyToOne(() => Estudio, (estudio) => estudio.jogos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'estudio_id' })
    estudio: Estudio;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
