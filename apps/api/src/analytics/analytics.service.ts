import { Injectable } from '@nestjs/common';
import { WritingType } from '@prisma/client';
import { ApiResponse, IMainModuleAnalytics } from 'src/@types';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class AnalyticsService {

    constructor(private readonly prisma: PrismaService) { }


    async getVisitsByMonthLast12Months() {

        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

        const visitsLast12Months = await this.prisma.visit.findMany({
            where: {
                createdAt: {
                    gte: twelveMonthsAgo,
                },
            },
        });

        const visitsByMonth = Array.from({ length: 12 }, (_, index) => ({
            month: (new Date().getMonth() - index + 12) % 12,
            visits: 0,
        }));

        visitsLast12Months.forEach(visit => {
            const monthIndex = (new Date(visit.createdAt).getMonth() - twelveMonthsAgo.getMonth() + 12) % 12;
            visitsByMonth[monthIndex].visits++;
        });

        const namedMonths: { month: string, visits: number }[] = visitsByMonth.map(function (visit) {
            return {
                month: getMonthName(visit.month),
                visits: visit.visits
            }
        })

        return new ApiResponse<{ month: string, visits: number }[]>(200, 'Visits analytics from last 12 months', namedMonths.reverse(), null);
    }



    async getPrincipalModulesAnalytics() {
        try {
            const visitsCount = await this.prisma.visit.count()
            const blogs = await this.prisma.writing.findMany({
                where: { writingType: WritingType.BLOG },
            })

            let blogReadsCount = 0;

            blogs.forEach(function (blog) {
                blogReadsCount += blog.reads
            })


            let newsletterSubsCount = await this.prisma.newsletterSubscriber.count()
            let openJobsCount = await this.prisma.job.count({
                where: {
                    isOpen: true
                }
            })

            return new ApiResponse<IMainModuleAnalytics>(200, 'Main module analytics generated', { blogReadsCount, visitsCount, newsletterSubsCount, openJobsCount })
        } catch (error) {
            return new ApiResponse<IMainModuleAnalytics>(401, 'Something went wrong', null, error.message)

        }
    }





}

function getMonthName(monthNumber: number) {
    switch (monthNumber) {
        case 1:
            return "January";
        case 2:
            return "February";
        case 3:
            return "March";
        case 4:
            return "April";
        case 5:
            return "May";
        case 6:
            return "June";
        case 7:
            return "July";
        case 8:
            return "August";
        case 9:
            return "September";
        case 10:
            return "October";
        case 11:
            return "November";
        case 0:
            return "December";
        default:
            return "Invalid month number";
    }
}