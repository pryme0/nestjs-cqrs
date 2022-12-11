import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class EncryptionService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(payload) {
    const token = await this.jwtService.sign(payload);
    return token;
  }

  async decodeToken(token: string) {
    return await this.jwtService.decode(token);
  }
}
