import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@Request() req){
    return this.authService.login(req.user.id , req.user.name)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getAll(@Request() req){
    return {messege:`now you access this protected api ${req.user.id}`}
  }
}
