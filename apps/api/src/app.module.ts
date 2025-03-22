import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { GeneratorsModule } from './generators/generators.module';
import { HomepageSliderModule } from './homepage-slider/homepage-slider.module';
import { JobApplicationsModule } from './job-applications/job-applications.module';
import { JobsModule } from './jobs/jobs.module';
import { NewsletterSubscribersModule } from './newsletter_subscribers/newsletter_subscribers.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { PartnerCompaniesModule } from './partner-companies/partner-companies.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { VisitsModule } from './visits/visits.module';
import { WritingModule } from './writing/writing.module';
import { OfficialsModule } from './officials/officials.module';
import { ServicesModule } from './services/services.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { SeoKeywordsModule } from './seo-keywords/seo-keywords.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    AuthModule,
    GeneratorsModule,
    PrismaModule,
    JwtModule,
    FilesModule,
    VisitsModule,
    NewsletterSubscribersModule,
    NodemailerModule,
    WritingModule,
    JobsModule,
    JobApplicationsModule,
    HomepageSliderModule,
    ReviewsModule,
    PartnerCompaniesModule,
    OfficialsModule,
    ServicesModule,
    ContactUsModule,
    SeoKeywordsModule,
    AnalyticsModule,
    GalleryModule,
  ],
  providers: [NodemailerService],
})
export class AppModule {
  constructor () {
  }
}
