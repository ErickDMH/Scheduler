import { SignUpDto } from 'src/features/auth/dto/signUp.dto';

export class CreateUserDto extends SignUpDto {
  refreshToken?: string;
  id?: number;
}
