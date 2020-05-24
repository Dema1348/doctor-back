import { Injectable } from '@nestjs/common';
import { PatientsService } from '../patients/patients.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class AuthService {
  constructor(
    private patientsService: PatientsService,
    private doctorService: DoctorsService,
    private jwtService: JwtService,
  ) {}

  async validatePatient(email: string, pass: string): Promise<any> {
    const user = await this.patientsService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateDoctor(email: string, pass: string): Promise<any> {
    const user = await this.doctorService.findByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = user;
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
