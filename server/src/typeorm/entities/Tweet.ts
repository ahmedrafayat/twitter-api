import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from './User';

@Entity('tweets')
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  author: User;

  @Column({ type: 'text', charset: 'utf8mb4' })
  content: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
