import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('agreements')
@Index(['taskId'])
@Index(['taskerId'])
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  taskId: string;

  @Column()
  taskerId: string;

  @Column()
  requesterId: string;

  @Column({ type: 'int' })
  agreedAmount: number;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string;

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  escrowStatus: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  escrowProvider: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  escrowReference: string | null;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  releasedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
