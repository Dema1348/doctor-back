import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateUpdateNotificationDto } from './notification.dto';
import * as admin from 'firebase-admin';

import * as serviceAccount from 'src/serviceAccountKey.json';
import { CreateUpdateRecordDto } from 'src/records/records.dto';
import { Patient } from 'src/patients/patient.entity';
import { stringify } from 'querystring';

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: 'https://onco-app.firebaseio.com',
});
@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findOne(id: number): Promise<CreateUpdateNotificationDto> {
    return this.notificationRepository.findOne(id);
  }

  findAll(): Promise<CreateUpdateNotificationDto[]> {
    return this.notificationRepository.find();
  }

  async create(
    notificationData: CreateUpdateNotificationDto,
  ): Promise<CreateUpdateNotificationDto> {
    return this.notificationRepository.save(notificationData);
  }

  async createPush(
    record: CreateUpdateRecordDto,
  ): Promise<CreateUpdateNotificationDto> {
    const { doctor, ...user } = await this.patientRepository.findOne(
      record.patientId,
      {
        relations: ['doctor'],
      },
    );

    const message = {
      notification: {
        title: `El paciente ${user.firstName}`,
        body: `Ha completado correctamente el ingreso de sus sintomas `,
      },
    };

    const notificationData: CreateUpdateNotificationDto = {
      title: message.notification.title,
      text: message.notification.body,
      read: false,
      patientId: user.id,
      doctorId: doctor.id,
    };

    try {
      const response = await admin
        .messaging()
        .sendToDevice(doctor.tokenFirebase || 'no-token', message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    return this.notificationRepository.save(notificationData);
  }

  async update(
    id: number,
    notificationData: CreateUpdateNotificationDto,
  ): Promise<boolean> {
    await this.notificationRepository.update(id, notificationData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.notificationRepository.delete(id);
    return true;
  }

  async isOwner(id: number, patientId: number) {
    const notificationData = await this.notificationRepository.findOne(id);
    if (notificationData.patientId !== patientId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
