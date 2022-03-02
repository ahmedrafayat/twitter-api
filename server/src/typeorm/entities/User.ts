import bcrypt from 'bcrypt';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Tweet } from 'typeorm/entities/Tweet';
import { UserFollowing } from 'typeorm/entities/UserFollowing';
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

  @OneToMany(() => Tweet, (tweet) => tweet.author, { lazy: true })
  tweets: Promise<Tweet[]>;

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.following)
  followers: UserFollowing[];

  @OneToMany(() => UserFollowing, (userFollowing) => userFollowing.follower)
  following: UserFollowing[];

  set password(pass: string) {
    this._password = bcrypt.hashSync(pass, 8);
  }

  get password() {
    return this._password;
  }

  public async validatePassword(pass: string) {
    return bcrypt.compare(pass, this.password);
  }

  static createUser(name: string, email: string, password: string) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    return user;
  }
}
