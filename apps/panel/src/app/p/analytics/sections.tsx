import { IVisit } from "@repo/ui/types"
import { Text } from "@repo/ui/units"
import dynamic from "next/dynamic"
import useSWR from "swr"
import SectionTitle from "../../../components/sectionTitle"
import Loading from "../../../components/units/loading"
import CustomTable from "../../../components/units/table"
import { fetcher } from "../../../utils/axios.config"
import { pad } from "../../../utils/formatDate"

const Chart = dynamic(() => import('react-apexcharts'))

interface IMainModuleAnalytics {
    visitsCount: number,
    blogReadsCount: number,
    newsletterSubsCount: number,
    openJobsCount: number
}

export function OverviewAnalytics() {
    const { data, isLoading, error }: { data: IMainModuleAnalytics, isLoading: boolean, error?: Error } = useSWR('/analytics/principal-module-analytics', fetcher)
    return (
        <>
            <SectionTitle title="Site overview" description="Numerical analytics of the website" />
            {isLoading
                ? <Loading /> : data &&
                <div className="grid grid-cols-4 gap-3">

                    <div className="p-6  rounded-md flex items-center gap-4 bg-white  my-4 w-full">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-lg">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.9999" cy="10.9994" r="10.2494" stroke="currentColor" stroke-width="1.5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.32905 0.126095C8.52189 1.42987 7.37065 3.43012 10.7164 4.71695C15.0296 6.37587 15.0259 8.42565 15.0207 11.2614C15.0205 11.3607 15.0203 11.461 15.0203 11.5622C15.0203 14.2973 16.6554 16.9812 21.4528 14.4331C21.8075 13.3527 21.9994 12.1985 21.9994 10.9994C21.9994 4.92461 17.0748 0 10.9999 0C10.4319 0 9.8739 0.0430604 9.32905 0.126095Z" fill="currentColor" />
                                <path d="M13.6187 21.686C12.7794 21.891 11.9024 21.9997 10.9999 21.9997C4.9251 21.9997 0.000488281 17.0751 0.000488281 11.0002C0.000488281 9.24835 0.410051 7.59212 1.13865 6.12207C1.50753 7.35438 2.60822 9.0364 4.90092 8.41465C8.13974 7.53633 9.40233 9.84193 9.31999 11.9828C9.3071 12.3178 9.28078 12.642 9.25553 12.9531C9.11938 14.6301 9.01431 15.9243 11.2139 16.4568C13.507 17.012 14.8873 19.6262 13.6187 21.686Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text>Website Visits</Text>
                            <Text variant="heading4">{pad(data.visitsCount)}</Text>
                        </div>
                    </div>
                    <div className="p-6  rounded-md flex items-center gap-4 bg-white  my-4 w-full">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.9999" cy="10.9994" r="10.2494" stroke="currentColor" stroke-width="1.5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.32905 0.126095C8.52189 1.42987 7.37065 3.43012 10.7164 4.71695C15.0296 6.37587 15.0259 8.42565 15.0207 11.2614C15.0205 11.3607 15.0203 11.461 15.0203 11.5622C15.0203 14.2973 16.6554 16.9812 21.4528 14.4331C21.8075 13.3527 21.9994 12.1985 21.9994 10.9994C21.9994 4.92461 17.0748 0 10.9999 0C10.4319 0 9.8739 0.0430604 9.32905 0.126095Z" fill="currentColor" />
                                <path d="M13.6187 21.686C12.7794 21.891 11.9024 21.9997 10.9999 21.9997C4.9251 21.9997 0.000488281 17.0751 0.000488281 11.0002C0.000488281 9.24835 0.410051 7.59212 1.13865 6.12207C1.50753 7.35438 2.60822 9.0364 4.90092 8.41465C8.13974 7.53633 9.40233 9.84193 9.31999 11.9828C9.3071 12.3178 9.28078 12.642 9.25553 12.9531C9.11938 14.6301 9.01431 15.9243 11.2139 16.4568C13.507 17.012 14.8873 19.6262 13.6187 21.686Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text>Blog visits</Text>
                            <Text variant="heading4">{pad(data.blogReadsCount)}</Text>
                        </div>
                    </div>
                    <div className="p-6  rounded-md flex items-center gap-4 bg-white  my-4 w-full">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-lg">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.9999" cy="10.9994" r="10.2494" stroke="currentColor" stroke-width="1.5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.32905 0.126095C8.52189 1.42987 7.37065 3.43012 10.7164 4.71695C15.0296 6.37587 15.0259 8.42565 15.0207 11.2614C15.0205 11.3607 15.0203 11.461 15.0203 11.5622C15.0203 14.2973 16.6554 16.9812 21.4528 14.4331C21.8075 13.3527 21.9994 12.1985 21.9994 10.9994C21.9994 4.92461 17.0748 0 10.9999 0C10.4319 0 9.8739 0.0430604 9.32905 0.126095Z" fill="currentColor" />
                                <path d="M13.6187 21.686C12.7794 21.891 11.9024 21.9997 10.9999 21.9997C4.9251 21.9997 0.000488281 17.0751 0.000488281 11.0002C0.000488281 9.24835 0.410051 7.59212 1.13865 6.12207C1.50753 7.35438 2.60822 9.0364 4.90092 8.41465C8.13974 7.53633 9.40233 9.84193 9.31999 11.9828C9.3071 12.3178 9.28078 12.642 9.25553 12.9531C9.11938 14.6301 9.01431 15.9243 11.2139 16.4568C13.507 17.012 14.8873 19.6262 13.6187 21.686Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text>Open positions</Text>
                            <Text variant="heading4">{pad(data.openJobsCount)}</Text>
                        </div>
                    </div>
                    <div className="p-6  rounded-md flex items-center gap-4 bg-white  my-4 w-full">
                        <div className="w-16 h-16 bg-violet-100 text-violet-600 flex items-center justify-center rounded-lg">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10.9999" cy="10.9994" r="10.2494" stroke="currentColor" stroke-width="1.5" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.32905 0.126095C8.52189 1.42987 7.37065 3.43012 10.7164 4.71695C15.0296 6.37587 15.0259 8.42565 15.0207 11.2614C15.0205 11.3607 15.0203 11.461 15.0203 11.5622C15.0203 14.2973 16.6554 16.9812 21.4528 14.4331C21.8075 13.3527 21.9994 12.1985 21.9994 10.9994C21.9994 4.92461 17.0748 0 10.9999 0C10.4319 0 9.8739 0.0430604 9.32905 0.126095Z" fill="currentColor" />
                                <path d="M13.6187 21.686C12.7794 21.891 11.9024 21.9997 10.9999 21.9997C4.9251 21.9997 0.000488281 17.0751 0.000488281 11.0002C0.000488281 9.24835 0.410051 7.59212 1.13865 6.12207C1.50753 7.35438 2.60822 9.0364 4.90092 8.41465C8.13974 7.53633 9.40233 9.84193 9.31999 11.9828C9.3071 12.3178 9.28078 12.642 9.25553 12.9531C9.11938 14.6301 9.01431 15.9243 11.2139 16.4568C13.507 17.012 14.8873 19.6262 13.6187 21.686Z" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Text>Newsletter subscribers</Text>
                            <Text variant="heading4">{pad(data.newsletterSubsCount)}</Text>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export function VisitsChart() {
    const { data, isLoading, error }: { data: { month: string, visits: number }[], isLoading: boolean, error?: Error } = useSWR('/analytics/visit-from-last-12-months', fetcher)
    return (
        <div className="bg-white p-4 rounded-md">
            <SectionTitle title="Visit charts" description="Visits charts in the last year" />
            {isLoading && <Loading />}
            {data &&
                <Chart
                    type="line"
                    height={300}
                    options={{
                        chart: {
                            id: 'visits-chart'
                        },
                        xaxis: {
                            categories: data.map(datum => datum.month)
                        }
                    }}

                    series={[
                        {

                            name: 'Visits',
                            data: data.map(datum => datum.visits)
                        }
                    ]}
                />}
        </div>
    )
}


export function VisitsTable() {
    const { data, isLoading, error }: { data: IVisit[], isLoading: boolean, error?: Error } = useSWR('/visits', fetcher)
    return (
        <div className="p-4 rounded-md bg-white">
            <SectionTitle title="Visits" />
            {isLoading && <Loading />}
            {data && <CustomTable pageSize={4} data={data.reverse().map(function (visit) {
                return {
                    time: new Date(visit.createdAt).toLocaleString(),
                    location: visit.location
                }

            })} columns={['Visit time', 'location']} />}
        </div>
    )
}