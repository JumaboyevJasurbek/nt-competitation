import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assistant } from './assistant.entity';
import { Students } from './students.entity ';

@Entity({ name: 'tasks' })
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task_name: string;

  @Column()
  mark: number;

  @Column()
  comment: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  submitted_time: string;

  @ManyToOne(() => Assistant, (assistant) => assistant.task, { cascade: true })
  assistant: Assistant;

  @ManyToOne(() => Students, (student) => student.task, { cascade: true })
  student: Students;
}
