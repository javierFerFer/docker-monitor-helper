import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MonitorModule } from './areas/monitor/monitor.module';
import { VersionModule } from './areas/version/version.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    MonitorModule,
    VersionModule,
  ],
})
export class AppModule {}
