import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
export declare class DatabaseService implements OnApplicationBootstrap {
    private readonly usersRepository;
    private readonly logger;
    constructor(usersRepository: Repository<User>);
    onApplicationBootstrap(): Promise<void>;
    private buildMockUsers;
}
