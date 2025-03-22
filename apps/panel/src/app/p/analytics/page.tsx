'use client'

import { OverviewAnalytics, VisitsChart, VisitsTable } from "./sections";

export default function Analytics() {


    return (
        <div>
            <OverviewAnalytics />
            <div className="grid grid-cols-2 gap-4">
                <VisitsChart />
                <VisitsTable />
            </div>
        </div>

    )
}