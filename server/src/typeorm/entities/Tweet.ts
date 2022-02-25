import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

import { Author } from './Author';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author, (author) => author.id)
  author: Author;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
