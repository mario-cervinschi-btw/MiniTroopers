import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(search?: string): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UserDto): Promise<User>;
}
