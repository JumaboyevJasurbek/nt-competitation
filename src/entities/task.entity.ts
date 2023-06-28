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
import { Assistant } from './assistant.entity';
import { Groups } from './groups.entity';

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

  @ManyToOne(() => Groups, (group) => group.task, { cascade: true })
  group: Groups;
}
