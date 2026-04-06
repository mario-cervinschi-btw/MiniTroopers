import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import type {
  TablePreferences,
} from './types/profile.types';
import { Skill } from 'src/skills/skills.entity';
import { Education } from './education.entity';
import { Experience } from './experience.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  profileImage: string;

  @Column()
  headline: string;

  @Column()
  dateOfBirth: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  location: string;

  @Column()
  about: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: false })
  isDarkTheme: boolean;

  @ManyToMany(() => Skill, (skill) => skill.users)
  @JoinTable()
  skills: Skill[];

  @OneToMany(() => Education, (education)=> education.user)
  education: Education[];

  @OneToMany(() => Experience, (exp)=> exp.user)
  experience: Experience[];

  @Column()
  connections: number;

  @Column()
  website: string;

  @Column({ type: 'simple-json', nullable: true })
  tablePreferences: TablePreferences | null;
}
