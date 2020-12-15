import { IsEmail, IsNotEmpty } from 'class-validator';

export class TravelerCreateDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  avatar: string;
}
