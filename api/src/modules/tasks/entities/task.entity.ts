import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('tasks')
@Index(['requesterId'])
@Index(['status'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requesterId: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  categoryId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  subcategoryId: string | null;

  @Column({ type: 'jsonb', default: {} })
  attributes: Record<string, any>;

  @Column({ type: 'simple-array', nullable: true })
  photos: string[] | null;

  @Column({ type: 'numeric', precision: 10, scale: 8 })
  lat: number;

  @Column({ type: 'numeric', precision: 11, scale: 8 })
  lng: number;

  @Column({ type: 'varchar', length: 255 })
  addressText: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  landmark: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lga: string | null;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date | null;

  @Column({ type: 'int' })
  budgetProposed: number;

  @Column({ type: 'varchar', length: 50 })
  priceType: string;

  @Column({ type: 'varchar', length: 50, default: 'posted' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
