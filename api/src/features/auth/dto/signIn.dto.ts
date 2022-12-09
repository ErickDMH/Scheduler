import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user',
    default: 'test001@mail.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'Password should be min 10 characters and contain 1 number, 1 Uppercase and 1 special character (!#$%&? ")',
    default: 'P4ssw0rd!!',
    required: true,
  })
  @Matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[!#$%&? "])[a-zA-Z0-9!#$%&?]{10,}$/)
  password: string;
}
