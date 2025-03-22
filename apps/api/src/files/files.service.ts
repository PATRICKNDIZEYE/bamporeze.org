import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApiResponse } from 'src/@types';
import cloudinary from 'src/utils/cloudinary';

@Injectable()
export class FilesService {
  async uploadFile(file: Express.Multer.File): Promise<ApiResponse<string>> {
    try {
      const stringified_file = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const res = await cloudinary.uploader.upload(stringified_file, {
        access_mode: 'public',
        public_id: file.originalname
          .replaceAll(/[. ]/g, '-')
          .toLocaleLowerCase(),
        allowed_formats: ['jpg', 'png', 'jpeg', 'webm', 'webp', 'pdf'],
      });
      return new ApiResponse<string>(
        200,
        'File uploaded successfully',
        res.secure_url,
      );
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException(err);
    }
  }

  async deleteFile(url: string): Promise<ApiResponse<string>> {
    const publicId = url.split('/').pop().split('.')[0];
    try {
      const res = await cloudinary.uploader.destroy(publicId);
      return new ApiResponse<string>(
        200,
        'File deleted successfully',
        res.result,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
