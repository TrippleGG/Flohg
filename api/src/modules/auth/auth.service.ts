import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private otpStore = new Map<string, { code: string; expiresAt: number }>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async requestOtp(phone: string): Promise<{ message: string }> {
    if (!this.isValidPhone(phone)) {
      throw new BadRequestException('Invalid phone number');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;

    this.otpStore.set(phone, { code, expiresAt });
    this.logger.log(`OTP requested for ${phone}`);
    console.log(`[DEMO] OTP for ${phone}: ${code}`);

    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(phone: string, code: string): Promise<{ accessToken: string; refreshToken: string }> {
    const otpData = this.otpStore.get(phone);

    if (!otpData) {
      throw new UnauthorizedException('OTP not found or expired');
    }

    if (Date.now() > otpData.expiresAt) {
      this.otpStore.delete(phone);
      throw new UnauthorizedException('OTP expired');
    }

    if (otpData.code !== code) {
      throw new UnauthorizedException('Invalid OTP');
    }

    this.otpStore.delete(phone);

    let user = await this.usersService.findByPhone(phone);
    if (!user) {
      user = await this.usersService.create({ phone });
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id, phone: user.phone },
      { expiresIn: '24h' },
    );
    const refreshToken = this.jwtService.sign(
      { sub: user.id, type: 'refresh' },
      { expiresIn: '7d' },
    );

    this.logger.log(`User ${user.id} authenticated`);

    return { accessToken, refreshToken };
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private isValidPhone(phone: string): boolean {
    return /^\+?234[0-9]{10}$|^0[0-9]{10}$/.test(phone);
  }
}
