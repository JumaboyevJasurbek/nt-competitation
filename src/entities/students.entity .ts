import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Groups } from './groups.entity';

@Entity({ name: 'students' })
export class Students extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @Column()
  tel_number: string;

  @Column()
  username: string;

  @Column()
  img: string;

  @Column()
  gender: string;

  @ManyToOne(() => Groups, (group) => group.student, { cascade: true })
  @JoinColumn()
  group: Groups;
}
