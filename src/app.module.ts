import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MedicalCentersModule } from './medicalCenters/medicalCenters.module';
import { PatientsModule } from './patients/patients.module';
import { LogBooksModule } from './logbooks/logbooks.module';
import { RecordsModule } from './records/records.module';
import { DoctorModule } from './doctors/doctors.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'doctor',
      autoLoadEntities: true,
      synchronize: true,
      migrations: ['src/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    AuthModule,
    DoctorModule,
    PatientsModule,
    LogBooksModule,
    RecordsModule,
    NotificationsModule,
    MedicalCentersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
