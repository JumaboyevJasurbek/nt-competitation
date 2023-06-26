import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assistant } from './assistant.entity';
import { Students } from './students.entity ';

@Entity({ name: 'groups' })
export class Groups extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column()
  group_number: number;

  @Column()
  teacher: string;

  @OneToOne(() => Assistant, (assistant) => assistant.groups, { cascade: true })
  @JoinColumn()
  assistant: Assistant;

  @Column('simple-array')
  lesson_days: string[];

  @Column()
  lesson_time: string;

  @Column({ type: 'date' })
  open_date: Date;

  @Column()
  img: string;

  @Column()
  room_number: number;

  @OneToMany(() => Students, (student) => student.group)
  student: Students[];
}
