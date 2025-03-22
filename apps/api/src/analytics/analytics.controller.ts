import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from 'src/@types';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) { }
    @Get('/visit-from-last-12-months')
    async getVisitsFromLast12Months(): Promise<ApiResponse<{ month: string, visits: number }[]>> {
        return this.analyticsService.getVisitsByMonthLast12Months();
    }


    @Get('principal-module-analytics')
    async getPrincipalModulesAnalytics() {
        return this.analyticsService.getPrincipalModulesAnalytics()
    }
}
