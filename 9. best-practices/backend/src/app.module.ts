import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NgrxController } from './ngrx/ngrx.controller';
import { NgrxRepository } from './ngrx/ngrx.repository';
import { NgrxService } from './ngrx/ngrx.service';
import { PracticesController } from './practices/practices.controller';
import { PracticesRepository } from './practices/practices.repository';
import { PracticesService } from './practices/practices.service';
import { RxjsController } from './rxjs/rxjs.controller';
import { RxjsRepository } from './rxjs/rxjs.repository';
import { RxjsService } from './rxjs/rxjs.service';
import { SignalsController } from './signals/signals.controller';
import { SignalsRepository } from './signals/signals.repository';
import { SignalsService } from './signals/signals.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    PracticesController,
    RxjsController,
    NgrxController,
    SignalsController,
  ],
  providers: [
    AppService,
    PracticesService,
    PracticesRepository,
    RxjsService,
    RxjsRepository,
    NgrxService,
    NgrxRepository,
    SignalsService,
    SignalsRepository,
  ],
})
export class AppModule {}
