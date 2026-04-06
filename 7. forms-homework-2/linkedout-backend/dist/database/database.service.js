"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DatabaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const users_entity_1 = require("../users/users.entity");
const skills_entity_1 = require("../skills/skills.entity");
const companies_entity_1 = require("../companies/companies.entity");
const jobs_entity_1 = require("../jobs/jobs.entity");
const job_type_enum_1 = require("../jobs/enums/job-type.enum");
const education_entity_1 = require("../users/education.entity");
const experience_entity_1 = require("../users/experience.entity");
let DatabaseService = DatabaseService_1 = class DatabaseService {
    usersRepo;
    skillsRepo;
    companiesRepo;
    jobsRepo;
    educationRepo;
    experienceRepo;
    logger = new common_1.Logger(DatabaseService_1.name);
    constructor(usersRepo, skillsRepo, companiesRepo, jobsRepo, educationRepo, experienceRepo) {
        this.usersRepo = usersRepo;
        this.skillsRepo = skillsRepo;
        this.companiesRepo = companiesRepo;
        this.jobsRepo = jobsRepo;
        this.educationRepo = educationRepo;
        this.experienceRepo = experienceRepo;
    }
    async onApplicationBootstrap() {
        const count = await this.skillsRepo.count();
        if (count > 0)
            return;
        this.logger.log('Seeding database...');
        const skills = await this.seedSkills();
        const companies = await this.seedCompanies();
        await this.seedJobs(companies, skills);
        await this.seedUsers(skills, companies);
        this.logger.log('Database seeding complete.');
    }
    async seedSkills() {
        const names = [
            'Angular',
            'React',
            'Vue.js',
            'TypeScript',
            'JavaScript',
            'Java',
            'Spring Boot',
            '.NET Core',
            'C#',
            'Python',
            'Django',
            'FastAPI',
            'Node.js',
            'NestJS',
            'Express.js',
            'PHP',
            'Laravel',
            'Go',
            'Rust',
            'Docker',
            'Kubernetes',
            'AWS',
            'Azure',
            'GCP',
            'PostgreSQL',
            'MySQL',
            'MongoDB',
            'Redis',
            'GraphQL',
            'Terraform',
        ];
        const saved = await this.skillsRepo.save(this.skillsRepo.create(names.map((name) => ({ name }))));
        this.logger.log(`Seeded ${saved.length} skills`);
        return saved;
    }
    async seedCompanies() {
        const data = [
            {
                name: 'Endava',
                description: 'Global tech services and digital transformation',
                location: 'Bucharest, RO',
                website: 'https://endava.example.com',
            },
            {
                name: 'Bitdefender',
                description: 'Leading cybersecurity software company',
                location: 'Bucharest, RO',
                website: 'https://bitdefender.example.com',
            },
            {
                name: 'UiPath',
                description: 'Robotic process automation platform',
                location: 'Bucharest, RO',
                website: 'https://uipath.example.com',
            },
            {
                name: 'Fortech',
                description: 'Software development and outsourcing',
                location: 'Cluj-Napoca, RO',
                website: 'https://fortech.example.com',
            },
            {
                name: 'Tremend',
                description: 'Digital transformation and software delivery',
                location: 'Bucharest, RO',
                website: 'https://tremend.example.com',
            },
            {
                name: 'Cognizant Romania',
                description: 'IT services and consulting',
                location: 'Cluj-Napoca, RO',
                website: 'https://cognizant-romania.example.com',
            },
            {
                name: 'Atos Romania',
                description: 'Digital transformation company',
                location: 'Bucharest, RO',
                website: 'https://atos-romania.example.com',
            },
            {
                name: 'ING Hubs Romania',
                description: 'Technology hub for ING Group',
                location: 'Bucharest, RO',
                website: 'https://ing-hubs-romania.example.com',
            },
            {
                name: 'Capgemini Romania',
                description: 'Consulting and IT services',
                location: 'Bucharest, RO',
                website: 'https://capgemini-romania.example.com',
            },
            {
                name: 'Accenture Romania',
                description: 'Global professional services company',
                location: 'Bucharest, RO',
                website: 'https://accenture-romania.example.com',
            },
            {
                name: 'NTT Data Romania',
                description: 'IT infrastructure and managed services',
                location: 'Timisoara, RO',
                website: 'https://nttdata-romania.example.com',
            },
            {
                name: 'Stefanini Romania',
                description: 'IT services and digital transformation',
                location: 'Cluj-Napoca, RO',
                website: 'https://stefanini-romania.example.com',
            },
            {
                name: 'Pentalog',
                description: 'Tech talent and digital product services',
                location: 'Iasi, RO',
                website: 'https://pentalog.example.com',
            },
            {
                name: 'Luxoft Romania',
                description: 'Software engineering and IT services',
                location: 'Bucharest, RO',
                website: 'https://luxoft-romania.example.com',
            },
            {
                name: 'Revolut',
                description: 'Global fintech and neobanking company',
                location: 'Bucharest, RO',
                website: 'https://revolut.example.com',
            },
            {
                name: 'Glovo Romania',
                description: 'On-demand delivery platform',
                location: 'Bucharest, RO',
                website: 'https://glovo-romania.example.com',
            },
            {
                name: 'SumUp Romania',
                description: 'Mobile payment and invoicing solutions',
                location: 'Bucharest, RO',
                website: 'https://sumup-romania.example.com',
            },
            {
                name: 'Siemens Romania',
                description: 'Technology and industrial engineering',
                location: 'Brasov, RO',
                website: 'https://siemens-romania.example.com',
            },
            {
                name: 'Continental Romania',
                description: 'Automotive and industrial technology',
                location: 'Timisoara, RO',
                website: 'https://continental-romania.example.com',
            },
            {
                name: 'Ericsson Romania',
                description: 'Telecom technology and networking',
                location: 'Bucharest, RO',
                website: 'https://ericsson-romania.example.com',
            },
            {
                name: 'Finastra',
                description: 'Financial software and cloud solutions',
                location: 'Bucharest, RO',
                website: 'https://finastra.example.com',
            },
            {
                name: 'Temenos Romania',
                description: 'Core banking software provider',
                location: 'Cluj-Napoca, RO',
                website: 'https://temenos-romania.example.com',
            },
            {
                name: 'Betfair Romania',
                description: 'Online betting platform engineering hub',
                location: 'Cluj-Napoca, RO',
                website: 'https://betfair-romania.example.com',
            },
            {
                name: 'Adobe Romania',
                description: 'Creative and digital media software',
                location: 'Bucharest, RO',
                website: 'https://adobe-romania.example.com',
            },
            {
                name: 'Oracle Romania',
                description: 'Enterprise software and cloud services',
                location: 'Bucharest, RO',
                website: 'https://oracle-romania.example.com',
            },
            {
                name: 'IBM Romania',
                description: 'IT consulting and cloud computing',
                location: 'Bucharest, RO',
                website: 'https://ibm-romania.example.com',
            },
            {
                name: 'HP Romania',
                description: 'Technology and printing solutions',
                location: 'Bucharest, RO',
                website: 'https://hp-romania.example.com',
            },
            {
                name: 'DB Global Technology',
                description: 'Deutsche Bank technology hub',
                location: 'Bucharest, RO',
                website: 'https://db-global-technology.example.com',
            },
            {
                name: 'Societe Generale Romania',
                description: 'Banking and financial services tech',
                location: 'Bucharest, RO',
                website: 'https://societe-generale-romania.example.com',
            },
            {
                name: 'Raiffeisen Technology',
                description: 'Banking innovation and technology center',
                location: 'Bucharest, RO',
                website: 'https://raiffeisen-technology.example.com',
            },
            {
                name: 'Orange Romania',
                description: 'Telecom and digital services',
                location: 'Bucharest, RO',
                website: 'https://orange-romania.example.com',
            },
            {
                name: 'Vodafone Romania',
                description: 'Mobile and digital connectivity',
                location: 'Bucharest, RO',
                website: 'https://vodafone-romania.example.com',
            },
            {
                name: 'Deloitte Romania',
                description: 'Audit, consulting and technology services',
                location: 'Bucharest, RO',
                website: 'https://deloitte-romania.example.com',
            },
            {
                name: 'PwC Romania',
                description: 'Advisory and digital transformation',
                location: 'Bucharest, RO',
                website: 'https://pwc-romania.example.com',
            },
            {
                name: 'EY Romania',
                description: 'Consulting and technology services',
                location: 'Bucharest, RO',
                website: 'https://ey-romania.example.com',
            },
            {
                name: 'Wipro Romania',
                description: 'IT services and process outsourcing',
                location: 'Bucharest, RO',
                website: 'https://wipro-romania.example.com',
            },
            {
                name: 'Infosys Romania',
                description: 'IT outsourcing and digital services',
                location: 'Bucharest, RO',
                website: 'https://infosys-romania.example.com',
            },
            {
                name: 'TechFusion Labs',
                description: 'Product engineering and innovation studio',
                location: 'Cluj-Napoca, RO',
                website: 'https://techfusion-labs.example.com',
            },
            {
                name: 'PixelCraft Studio',
                description: 'UI/UX design and frontend engineering',
                location: 'Iasi, RO',
                website: 'https://pixelcraft-studio.example.com',
            },
            {
                name: 'CloudNine Systems',
                description: 'Cloud infrastructure and DevOps specialists',
                location: 'Timisoara, RO',
                website: 'https://cloudnine-systems.example.com',
            },
            {
                name: 'DataBridge Analytics',
                description: 'Data engineering and business analytics',
                location: 'Bucharest, RO',
                website: 'https://databridge-analytics.example.com',
            },
            {
                name: 'SecureCore',
                description: 'Cybersecurity and compliance consulting',
                location: 'Cluj-Napoca, RO',
                website: 'https://securecore.example.com',
            },
            {
                name: 'Agile Flow',
                description: 'Agile software development and coaching',
                location: 'Brasov, RO',
                website: 'https://agile-flow.example.com',
            },
            {
                name: 'MobileFirst Agency',
                description: 'Cross-platform mobile app development',
                location: 'Bucharest, RO',
                website: 'https://mobilefirst-agency.example.com',
            },
            {
                name: 'API Craft',
                description: 'Backend systems and API design specialists',
                location: 'Iasi, RO',
                website: 'https://api-craft.example.com',
            },
            {
                name: 'DevCore Solutions',
                description: 'Custom software and ERP development',
                location: 'Oradea, RO',
                website: 'https://devcore-solutions.example.com',
            },
            {
                name: 'Synapse Tech',
                description: 'AI, ML and intelligent automation solutions',
                location: 'Cluj-Napoca, RO',
                website: 'https://synapse-tech.example.com',
            },
            {
                name: 'OpenNode',
                description: 'Open source consulting and development',
                location: 'Bucharest, RO',
                website: 'https://opennode.example.com',
            },
            {
                name: 'Haufe Romania',
                description: 'HR and finance software solutions',
                location: 'Timisoara, RO',
                website: 'https://haufe-romania.example.com',
            },
            {
                name: 'Crossover Romania',
                description: 'Remote software talent and products',
                location: 'Bucharest, RO',
                website: 'https://crossover-romania.example.com',
            },
        ];
        const saved = await this.companiesRepo.save(this.companiesRepo.create(data));
        this.logger.log(`Seeded ${saved.length} companies`);
        return saved;
    }
    async seedJobs(companies, skills) {
        const titles = [
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Software Engineer',
            'Senior Software Engineer',
            'Lead Developer',
            'DevOps Engineer',
            'Cloud Engineer',
            'Data Engineer',
            'QA Automation Engineer',
            'Mobile Developer',
            'Site Reliability Engineer',
            'Platform Engineer',
            'Staff Engineer',
            'Security Engineer',
            'API Developer',
            'Solutions Architect',
            'Technical Lead',
            'Principal Engineer',
            'Engineering Manager',
        ];
        const types = [
            job_type_enum_1.JobType.FULL_TIME,
            job_type_enum_1.JobType.PART_TIME,
            job_type_enum_1.JobType.CONTRACT,
            job_type_enum_1.JobType.REMOTE,
            job_type_enum_1.JobType.HYBRID,
            job_type_enum_1.JobType.FREELANCE,
            job_type_enum_1.JobType.INTERNSHIP,
        ];
        const descriptions = [
            'Build and maintain scalable web applications using modern tech stacks.',
            'Design and implement RESTful APIs and microservices architecture.',
            'Collaborate with cross-functional teams to deliver high-quality software.',
            'Lead technical initiatives and mentor junior team members.',
            'Develop cloud-native solutions and manage infrastructure on AWS/Azure/GCP.',
            'Optimize application performance, security and system reliability.',
            'Drive frontend architecture, component libraries and reusability standards.',
            'Work on distributed systems, event-driven pipelines and data platforms.',
            'Integrate third-party services and ensure cloud infrastructure scalability.',
            'Own code quality through automated testing, monitoring and code reviews.',
        ];
        const jobs = [];
        for (let i = 0; i < 100; i++) {
            const company = companies[i % companies.length];
            jobs.push(this.jobsRepo.create({
                title: titles[i % titles.length],
                description: descriptions[i % descriptions.length],
                location: company.location,
                type: types[i % types.length],
                company,
                requiredSkills: this.pickUnique(skills, i * 3, (i % 4) + 3),
            }));
        }
        const saved = await this.jobsRepo.save(jobs);
        this.logger.log(`Seeded ${saved.length} jobs`);
        return saved;
    }
    async seedUsers(skills, companies) {
        const firstNames = [
            'Alex',
            'Ana',
            'Andrei',
            'Bianca',
            'Bogdan',
            'Catalin',
            'Cristina',
            'Dan',
            'Diana',
            'Elena',
            'Florin',
            'Gabriela',
            'George',
            'Ioana',
            'Ioan',
            'Julia',
            'Laura',
            'Liviu',
            'Madalina',
            'Mihai',
            'Mircea',
            'Monica',
            'Nicoleta',
            'Oana',
            'Octavian',
            'Paula',
            'Petru',
            'Radu',
            'Raluca',
            'Ramona',
            'Roxana',
            'Sebastian',
            'Simona',
            'Silviu',
            'Sorin',
            'Stefan',
            'Tudor',
            'Vlad',
            'Adriana',
            'Alina',
            'Claudiu',
            'Cosmin',
            'Daria',
            'Emil',
            'Florentina',
            'Gabriel',
            'Horia',
            'Irina',
            'Larisa',
            'Victor',
        ];
        const lastNames = [
            'Popescu',
            'Ionescu',
            'Dumitrescu',
            'Stan',
            'Marin',
            'Matei',
            'Rusu',
            'Munteanu',
            'Tudor',
            'Georgescu',
            'Constantin',
            'Popa',
            'Lazar',
            'Stoian',
            'Dinu',
            'Badea',
            'Florescu',
            'Sandu',
            'Pavel',
            'Chirita',
            'Rosu',
            'Negru',
            'Barbu',
            'Vlad',
            'Oprea',
            'Voicu',
            'Dobre',
            'Lupu',
            'Toma',
            'Grigore',
            'Lungu',
            'Bucur',
            'Cretu',
            'Manea',
            'Nita',
            'Preda',
            'Serban',
            'Avram',
            'Bogdan',
            'Ciobanu',
            'Dragomir',
            'Enache',
            'Ghita',
            'Iacob',
            'Leonte',
            'Mihalache',
            'Neagu',
            'Olaru',
            'Patrascu',
            'Zamfir',
        ];
        const locations = [
            'Bucharest, RO',
            'Cluj-Napoca, RO',
            'Iasi, RO',
            'Timisoara, RO',
            'Brasov, RO',
            'Constanta, RO',
            'Oradea, RO',
            'Sibiu, RO',
            'Craiova, RO',
            'Galati, RO',
        ];
        const headlines = [
            'Frontend Developer passionate about great UX',
            'Backend Engineer focused on scalable APIs',
            'Full Stack Developer | Open Source Enthusiast',
            'Senior Software Engineer | Team Lead',
            'Cloud & DevOps Engineer | Kubernetes Certified',
            'Mobile Developer | React Native & Flutter',
            'Software Architect | Microservices & DDD',
            'QA Engineer | Test Automation Specialist',
            'Data Engineer | Pipelines & Analytics',
            'TypeScript & Angular enthusiast',
        ];
        const universities = [
            'University of Bucharest',
            'Politehnica University Bucharest',
            'Babes-Bolyai University',
            'Alexandru Ioan Cuza University',
            'West University of Timisoara',
            'Technical University of Cluj-Napoca',
            'University of Craiova',
            'Gheorghe Asachi Technical University',
            'University of Pitesti',
            'Lucian Blaga University of Sibiu',
        ];
        const degrees = ['BSc', 'MSc', 'BEng', 'MEng', 'BA'];
        const fields = [
            'Computer Science',
            'Software Engineering',
            'Information Technology',
            'Computer Engineering',
            'Mathematics and Computer Science',
            'Informatics',
            'Applied Computer Science',
            'Cybersecurity',
        ];
        const jobTitles = [
            'Frontend Developer',
            'Backend Developer',
            'Full Stack Developer',
            'Software Engineer',
            'Senior Developer',
            'Junior Developer',
            'DevOps Engineer',
            'Tech Lead',
            'UI Engineer',
            'QA Engineer',
        ];
        const jobDescriptions = [
            'Built scalable UI components and collaborated with backend teams.',
            'Developed and maintained RESTful APIs with high availability.',
            'Led frontend architecture decisions and conducted code reviews.',
            'Implemented CI/CD pipelines and managed cloud deployments.',
            'Optimized database queries and reduced API response times by 40%.',
            'Created automated test suites covering unit and integration tests.',
            'Migrated legacy monolith to a microservices architecture.',
            'Worked on real-time features using WebSockets and Redis pub/sub.',
            'Delivered mobile-first experiences with responsive design.',
            'Mentored junior developers and participated in technical interviews.',
        ];
        const p = (arr, i, offset = 0) => arr[(i + offset) % arr.length];
        const passwordMap = new Map();
        for (const name of firstNames) {
            passwordMap.set(name, await bcrypt.hash(name, 4));
        }
        const usersToSave = [];
        for (let i = 0; i < 500; i++) {
            const firstName = firstNames[i % firstNames.length];
            const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
            const location = p(locations, i, 3);
            const year = 1978 + (i % 22);
            const month = (i % 12) + 1;
            const day = (i % 28) + 1;
            usersToSave.push(this.usersRepo.create({
                firstName,
                lastName,
                profileImage: '',
                headline: p(headlines, i),
                dateOfBirth: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@example.com`,
                phone: `+40 7${((i % 90) + 10).toString()} ${((i % 900) + 100).toString()} ${(((i * 3) % 900) + 100).toString()}`,
                location,
                about: `${firstName} ${lastName} is a software professional based in ${location}, focused on delivering clean and reliable software.`,
                password: passwordMap.get(firstName),
                connections: 10 + ((i * 13) % 490),
                website: `https://example.com/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${i + 1}`,
                tablePreferences: null,
                skills: this.pickUnique(skills, i * 7, (i % 5) + 3),
            }));
        }
        const savedUsers = await this.usersRepo.save(usersToSave);
        const allEducation = [];
        for (let i = 0; i < savedUsers.length; i++) {
            const eduCount = 1 + (i % 2);
            let eduStart = 2000 + (i % 10);
            for (let e = 0; e < eduCount; e++) {
                const duration = e === 0 ? 4 : 2;
                allEducation.push(this.educationRepo.create({
                    institution: p(universities, i, e * 3),
                    degree: p(degrees, i, e),
                    fieldOfStudy: p(fields, i, e * 2),
                    startYear: eduStart,
                    endYear: eduStart + duration,
                    user: savedUsers[i],
                }));
                eduStart += duration;
            }
        }
        await this.educationRepo.save(allEducation);
        const allExperience = [];
        for (let i = 0; i < savedUsers.length; i++) {
            const expCount = 2 + (i % 3);
            let expStart = 2006 + (i % 10);
            for (let e = 0; e < expCount; e++) {
                const duration = 1 + ((i + e) % 4);
                const isCurrent = e === expCount - 1;
                const company = companies[(i * 3 + e * 11) % companies.length];
                allExperience.push(this.experienceRepo.create({
                    title: p(jobTitles, i, e),
                    location: company.location ?? p(locations, i),
                    startDate: `${expStart}-${(((e * 3) % 12) + 1).toString().padStart(2, '0')}-01`,
                    endDate: isCurrent
                        ? null
                        : `${expStart + duration}-${(((e * 5) % 12) + 1).toString().padStart(2, '0')}-28`,
                    description: p(jobDescriptions, i, e * 2),
                    user: savedUsers[i],
                    company,
                }));
                if (!isCurrent)
                    expStart += duration;
            }
        }
        await this.experienceRepo.save(allExperience);
        this.logger.log(`Seeded ${savedUsers.length} users with education and experience`);
    }
    pickUnique(arr, offset, count) {
        const map = new Map();
        for (let i = 0; map.size < count && i < arr.length * 2; i++) {
            const item = arr[(offset + i * 13) % arr.length];
            map.set(item.id, item);
        }
        return [...map.values()];
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = DatabaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(skills_entity_1.Skill)),
    __param(2, (0, typeorm_1.InjectRepository)(companies_entity_1.Company)),
    __param(3, (0, typeorm_1.InjectRepository)(jobs_entity_1.Job)),
    __param(4, (0, typeorm_1.InjectRepository)(education_entity_1.Education)),
    __param(5, (0, typeorm_1.InjectRepository)(experience_entity_1.Experience)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DatabaseService);
//# sourceMappingURL=database.service.js.map