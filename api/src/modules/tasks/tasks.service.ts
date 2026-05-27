import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, requesterId: string): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      requesterId,
      status: 'posted',
    });
    return this.taskRepository.save(task);
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    return task;
  }

  async search(searchDto: SearchTaskDto): Promise<Task[]> {
    return this.taskRepository.find({
      where: { status: 'posted' },
      take: searchDto.limit || 20,
      skip: searchDto.offset || 0,
    });
  }
}
