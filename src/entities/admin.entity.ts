import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  username: string;

  @Column()
  password: string;
}
