import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SignInDto } from './signIn.dto';

export class SignUpDto extends SignInDto {
  @MinLength(3)
  @ApiProperty({
    description: 'The full name of the user',
    minLength: 3,
    default: 'Test FullName 001',
    required: false,
  })
  name: string;
}
