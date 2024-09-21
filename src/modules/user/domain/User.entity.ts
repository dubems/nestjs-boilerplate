import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false, name: `is_verified` })
    isVerified: boolean;

    @CreateDateColumn({name: `created_at`})
    createdAt: Date

    @UpdateDateColumn({name: `updated_at`})
    updatedAt: Date
}