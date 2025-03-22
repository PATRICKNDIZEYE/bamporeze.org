import { Injectable } from '@nestjs/common';
import { Writing, WritingType } from '@prisma/client';
import { ApiResponse } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';
import mailer from 'src/utils/nodemailer';
import { CreateWritingDto } from './dtos';

@Injectable()
export class WritingService {
  constructor(private prisma: PrismaService) { }
  async createWriting(data: CreateWritingDto, user: string) {
    try {
      const writing = await this.prisma.writing.create({
        data: {
          thumbnail_image: data.thumbnail_image,
          title: data.title,
          description: data.description,
          content: data.content,
          writingType: data.writingType as WritingType,
          isReleased: data.isReleased,
          releaseDate: data.isReleased == true ? new Date() : null,
          author: {
            connect: {
              id: user,
            },
          },
        },
        include: {
          author: true,
        },
      });
      delete writing.author.password;
      this.releaseWriting(writing.id)
      return new ApiResponse<Writing>(
        201,
        'Writing created successfully',
        writing,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async getRandomBlog(): Promise<ApiResponse<Writing>> {
    try {
      const writings = await this.prisma.writing.findMany({
        where: {
          writingType: WritingType.BLOG,
          isReleased: true,
        },
        include: {
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      });
      if (writings.length == 0) return new ApiResponse(404, 'No blog found', null, 'No blog found')
      const randomBlog = writings[0]
      delete randomBlog.author.password
      return new ApiResponse<Writing>(
        200,
        'Random writing retrieved',
        randomBlog,
      );
    } catch (error) {
      return new ApiResponse(401, 'An error occurred', null, error);
    }
  }

  async getBlogs(): Promise<ApiResponse<Writing[]>> {
    try {
      const blogs = await this.prisma.writing.findMany({
        where: {
          writingType: WritingType.BLOG,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              id: true,
              profile_picture: true,
            },
          },
        },
      });


      return new ApiResponse<Writing[]>(
        200,
        'Blogs fetched successfully',
        blogs,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }
  async getBlogsForSite(): Promise<ApiResponse<Writing[]>> {
    try {
      const blogs = await this.prisma.writing.findMany({
        where: {
          writingType: WritingType.BLOG,
          isReleased: true
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              id: true,
              profile_picture: true,
            },
          },
        },
      });


      return new ApiResponse<Writing[]>(
        200,
        'Blogs fetched successfully',
        blogs,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async getNewsletters(): Promise<ApiResponse<Writing[]>> {
    try {
      const blogs = await this.prisma.writing.findMany({
        where: {
          writingType: WritingType.NEWSLETTER,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              id: true,
              profile_picture: true,
            },
          },
        },
      });

      return new ApiResponse<Writing[]>(
        200,
        'Newsletters fetched successfully',
        blogs,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }
  async getReleased(
    writingType: 'newsletter' | 'blog',
  ): Promise<ApiResponse<Writing[]>> {
    try {
      const blogs = await this.prisma.writing.findMany({
        where: {
          writingType:
            writingType == 'newsletter'
              ? WritingType.NEWSLETTER
              : WritingType.BLOG,
          isReleased: true,
        },
        include: {
          author: {
            select: {
              name: true,
              email: true,
              id: true,
              profile_picture: true,
            },
          },
        },
      });

      return new ApiResponse<Writing[]>(
        200,
        'Blogs fetched successfully',
        blogs,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async getWriting(id: string): Promise<ApiResponse<Writing>> {
    try {
      const writing = await this.prisma.writing.findUnique({
        where: {
          id,
        },
        include: {
          author: true,
        },
      });
      return new ApiResponse<Writing>(
        200,
        'Writing fetched successfully',
        writing,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async releaseWriting(id: string): Promise<ApiResponse<Writing>> {
    try {
      const writing = await this.prisma.writing.update({
        where: {
          id,
        },
        data: {
          isReleased: true,
          releaseDate: new Date(),
        },
        include: {
          author: true,
        },
      });
      delete writing.author.password;
      delete writing.author.verification_code;

      // If the writing is typeof Newsletter, then send to all newsletter subscribers.
      if (writing.writingType == WritingType.NEWSLETTER) {
        const subscribers = await this.prisma.newsletterSubscriber.findMany({
          select: {
            email: true,
          },
        });
        mailer.sendMail({
          from: 'hcakigali Newsletter',
          to: subscribers.map((sub) => sub.email),
          date: new Date(),
          priority: 'high',
          text: writing.content,
        });
      }
      return new ApiResponse<Writing>(
        200,
        'Writing released successfully',
        writing,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async updateWriting(
    id: string,
    updateWritingDto: Partial<CreateWritingDto>,
  ): Promise<ApiResponse<Writing>> {
    try {
      const writing = await this.prisma.writing.update({
        where: {
          id: id,
        },
        data: {
          thumbnail_image: updateWritingDto.thumbnail_image,
          title: updateWritingDto.title,
          description: updateWritingDto.description,
          content: updateWritingDto.content,
          writingType: updateWritingDto.writingType as WritingType,
          isReleased: updateWritingDto.isReleased,
          releaseDate: updateWritingDto.isReleased ? new Date() : null,
        },
        include: {
          author: true,
        },
      });

      delete writing.author.password;
      return new ApiResponse<Writing>(
        200,
        'Writing updated successfully',
        writing,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }
  async readWriting(
    id: string,
  ): Promise<ApiResponse<null>> {
    try {
      await this.prisma.writing.update({
        where: {
          writingType: WritingType.BLOG,
          id: id,
        },
        data: {
          reads: {
            increment: 1
          }
        }
      });

      return new ApiResponse<null>(
        200,
        'Read successfully',
        null,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }

  async deleteWriting(id: string): Promise<ApiResponse<Writing>> {
    try {
      const writing = await this.prisma.writing.delete({
        where: {
          id,
        },
        include: {
          author: {
            select: {
              email: true,
              name: true,
              profile_picture: true,
            },
          },
        },
      });

      return new ApiResponse<Writing>(
        200,
        'Writing deleted successfully',
        writing,
      );
    } catch (error) {
      return new ApiResponse(401, 'Something went wrong', null, error.message)
    }
  }
}
