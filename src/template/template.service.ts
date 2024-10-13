import {BadRequestException, Injectable} from '@nestjs/common';
import {CloudinaryService} from "../cloudinary/cloudinary.service";

@Injectable()
export class TemplateService {

    constructor(private cloudinary: CloudinaryService) {}
    async uploadImageToCloudinary(file: Express.Multer.File) {
        return await this.cloudinary.uploadFile(file).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }
}
