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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const users_entity_1 = require("../users/users.entity");
const skills_entity_1 = require("../skills/skills.entity");
const education_entity_1 = require("../users/education.entity");
const experience_entity_1 = require("../users/experience.entity");
const companies_entity_1 = require("../companies/companies.entity");
const jobs_entity_1 = require("../jobs/jobs.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [users_entity_1.User, skills_entity_1.Skill, education_entity_1.Education, experience_entity_1.Experience, companies_entity_1.Company, jobs_entity_1.Job],
    synchronize: true,
});
async function seedPasswords() {
    await dataSource.initialize();
    const repo = dataSource.getRepository(users_entity_1.User);
    const users = await repo.find();
    if (users.length === 0) {
        console.log('No users found.');
        await dataSource.destroy();
        return;
    }
    for (const user of users) {
        user.password = await bcrypt.hash(user.firstName, 10);
        await repo.save(user);
        console.log(`✔ Set password for ${user.firstName} ${user.lastName} (id=${user.id})`);
    }
    console.log(`\nDone. Updated ${users.length} user(s).`);
    await dataSource.destroy();
}
seedPasswords().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=seed-passwords.js.map