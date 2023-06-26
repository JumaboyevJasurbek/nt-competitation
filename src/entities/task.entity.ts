import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assistant } from './assistant.entity';
import { Groups } from './groups.entity';

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  task_name: string;

  @Column()
  mark: string;

  @Column()
  comment: string;

  @Column({ type: 'date' })
  date: Date;

  @OneToOne(() => Assistant)
  @JoinColumn()
  assistant: Assistant;

  @OneToOne(() => Groups)
  @JoinColumn()
  group: Groups;
}
