import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { OtpStartDto } from './dto/otp-start.dto';
import { OtpVerifyDto } from './dto/otp-verify.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('otp/start')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent' })
  async otpStart(@Body() otpStartDto: OtpStartDto) {
    return this.authService.requestOtp(otpStartDto.phone);
  }

  @Post('otp/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP and get tokens' })
  @ApiResponse({ status: 200, description: 'Authentication successful' })
  async otpVerify(@Body() otpVerifyDto: OtpVerifyDto) {
    return this.authService.verifyOtp(otpVerifyDto.phone, otpVerifyDto.code);
  }
}
