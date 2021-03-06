import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from 'typeorm/entities/User';

@Entity('user_following')
export class UserFollowing {
  @PrimaryColumn()
  @JoinColumn()
  followerId: number;

  @PrimaryColumn()
  @JoinColumn()
  followingId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.followers, { eager: true, onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, (user) => user.following, { eager: true, onDelete: 'CASCADE' })
  following: User;

  static createFollowing(follower: number, following: number) {
    const userFollowing = new UserFollowing();
    userFollowing.followerId = follower;
    userFollowing.followingId = following;
    return userFollowing;
  }
}
