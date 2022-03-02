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

  @Column()
  @JoinColumn({ referencedColumnName: 'id' })
  authorId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE', lazy: true })
  author: Promise<User>;

  @Column({ type: 'text', charset: 'utf8mb4' })
  content: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  static createTweet(content: string, authorId: number) {
    const tweet = new Tweet();
    tweet.content = content;
    tweet.authorId = authorId;
    return tweet;
  }
}
