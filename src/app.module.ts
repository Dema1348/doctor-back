import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MedicalCentersModule } from './medicalCenters/medicalCenters.module';
import { PatientsModule } from './patients/patients.module';
import { LogBooksModule } from './logbooks/logbooks.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'doctor',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    PatientsModule,
    LogBooksModule,
    RecordsModule,
    MedicalCentersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
