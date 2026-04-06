import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(search?: string, sort?: string, order?: 'asc' | 'desc', page?: number, limit?: number): Promise<[User[], number]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(data: Partial<User>): Promise<User>;
    update(id: number, updateUserDto: UserDto): Promise<User>;
}
