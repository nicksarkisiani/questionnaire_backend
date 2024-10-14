import {ApiProperty} from "@nestjs/swagger";


export class registrationDto {
    @ApiProperty({example: "user@gmail.com", description: "email" })
    email: string;
    @ApiProperty({example: "username", description: "username" })
    username: string;
    @ApiProperty({example: "12345678", description: "password" })
    password: string;
}

export class loginDto {
    @ApiProperty({example: "user@gmail.com", description: "email" })
    email: string;
    @ApiProperty({example: "12345678", description: "password" })
    password: string;
}