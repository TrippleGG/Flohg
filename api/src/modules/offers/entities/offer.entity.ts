import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('offers')
@Index(['taskId'])
@Index(['providerId'])
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskId: string;

  @Column()
  providerId: string;

  @Column()
  taskRequesterId: string;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'text', nullable: true })
  message: string | null;

  @Column({ type: 'int', nullable: true })
  etaMinutes: number | null;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
