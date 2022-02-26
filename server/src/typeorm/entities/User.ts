import bcrypt from 'bcrypt';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UserFollowing } from './Follower';
import { Tweet } from './Tweet';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ name: 'password' })
  _password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Tweet, (tweet) => tweet.author)
  tweets: Promise<Tweet[]>;

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.following)
  followers: UserFollowing[];

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.follower)
  following: UserFollowing[];

  set password(pass: string) {
    this._password = bcrypt.hashSync(pass, 8);
  }

  get password() {
    return this.password;
  }
}
