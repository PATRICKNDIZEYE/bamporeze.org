'use client'
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { IJobApplicant, IJobPosition } from "@repo/ui/types"
import { Button, Preview, Text } from "@repo/ui/units"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"
import Applicant from "../../../../components/modals/applicant"
import SectionTitle from "../../../../components/sectionTitle"
import Loading from "../../../../components/units/loading"
import CustomTable from "../../../../components/units/table"
import useGlobalCtx from "../../../../hooks/useGlobalContext"
import useModal from "../../../../hooks/useModal"
import { axios, fetcher } from "../../../../utils/axios.config"
import formatDate from "../../../../utils/formatDate"
import { formatJobType } from "../../../../utils/jobTypes"

export default function SingleJobPosition({ 
  params 
}: { 
  params: { id: string } 
}) {
    const router = useRouter()
    const { setModal } = useModal()
    const [openTab, setOpenTab] = useState<'desc' | 'appls'>('desc')
    const { data, isLoading, error, mutate } = useSWR(`/jobs/${params.id}`, fetcher)
    const { jobs, setJobs } = useGlobalCtx()
    const [loading, setLoading] = useState(true)
    const [errorState, setErrorState] = useState<string | null>(null)

    const handleDelete = async () => {
        try {
            await axios.delete(`/jobs/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success('Job removed')
            setJobs(jobs.filter(job => job.id != params.id))
            router.push('/p/careers')
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    if (isLoading) return <Loading />
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>Job not found</div>

    return (
        <div className="p-4 bg-white rounded flex  flex-col gap-3 w-full h-full">
            <SectionTitle title={data.title} description='View and modify details about this program, also find applicants ' />
            <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.2501 14.15V18.4C20.2501 19.494 19.4631 20.436 18.3781 20.58C16.2911 20.857 14.1621 21 12.0001 21C9.83806 21 7.70906 20.857 5.62206 20.58C4.53706 20.436 3.75006 19.494 3.75006 18.4V14.15M20.2501 14.15C20.4875 13.9436 20.6775 13.6883 20.807 13.4016C20.9364 13.1149 21.0023 12.8036 21.0001 12.489V8.706C21.0001 7.625 20.2321 6.691 19.1631 6.531C18.0304 6.36142 16.892 6.23234 15.7501 6.144M20.2501 14.15C20.0561 14.315 19.8301 14.445 19.5771 14.53C17.1333 15.3408 14.5748 15.7528 12.0001 15.75C9.35206 15.75 6.80506 15.321 4.42306 14.53C4.17631 14.4479 3.94778 14.3189 3.75006 14.15M3.75006 14.15C3.5126 13.9436 3.32262 13.6883 3.19315 13.4016C3.06369 13.1149 2.99782 12.8036 3.00006 12.489V8.706C3.00006 7.625 3.76806 6.691 4.83706 6.531C5.96975 6.36142 7.10814 6.23233 8.25006 6.144M15.7501 6.144V5.25C15.7501 4.65326 15.513 4.08097 15.091 3.65901C14.6691 3.23705 14.0968 3 13.5001 3H10.5001C9.90332 3 9.33102 3.23705 8.90907 3.65901C8.48711 4.08097 8.25006 4.65326 8.25006 5.25V6.144M15.7501 6.144C13.2538 5.95108 10.7463 5.95108 8.25006 6.144M12.0001 12.75H12.0081V12.758H12.0001V12.75Z" stroke="#0A142F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Text variant='label' className="text-brand-blackblue font-bold">  {formatJobType(data.type)} </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.75 21H20.25M4.5 3H19.5M5.25 3V21M18.75 3V21M9 6.75H10.5M9 9.75H10.5M9 12.75H10.5M13.5 6.75H15M13.5 9.75H15M13.5 12.75H15M9 21V17.625C9 17.004 9.504 16.5 10.125 16.5H13.875C14.496 16.5 15 17.004 15 17.625V21" stroke="#0A142F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <Text variant='label' className="text-brand-blackblue font-bold">  {data.location} </Text>
                    </div>
                    {data.isOpen && <span className="text-green-600 bg-green-100 py-1 px-4 rounded-full">Active</span>}

                </div>
                <div className="flex items-center w-fit gap-2">
                    <Button variant={'tertiary'} className="flex items-center gap-2 text-red-400 border-none" onClick={handleDelete}><TrashIcon /> <span className="text-sm">Delete</span></Button>
                    <Button variant={'tertiary'} className="flex items-center gap-2 text-brand-darkblue"><Pencil1Icon /></Button>
                </div>
            </div>
            <div className="flex  items-center  border-b  mb-10 ">
                <button className={` flex text-sm items-center gap-2 px-5 py-2 ${openTab == 'desc' && 'border-b border-brand-darkblue text-brand-darkblue font-medium'}`} onClick={() => setOpenTab('desc')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <span>Description</span>
                </button>
                <button className={` flex text-sm items-center gap-2 px-5 py-2 ${openTab == 'appls' && 'border-b border-brand-darkblue text-brand-darkblue font-medium'}`} onClick={() => setOpenTab('appls')} >          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>

                    <span>Applicants</span>
                </button>


            </div>
            {openTab == 'desc' ? <Preview value={data.description} /> :
                <>
                    <Text>Applicants ({data.applications.length})</Text>
                    <CustomTable columns={['Date', 'Names', 'Phone number', 'Email address', 'Details']}
                        data={(data.applications as IJobApplicant[]).map(datum => {
                            return {
                                date: formatDate(datum.createdAt),
                                names: datum.first_name + " " + datum.last_name,
                                phone: datum.phone_number,
                                email: datum.email,
                                actions: <Button variant={'tertiary'} onClick={() => setModal(<Applicant title={datum.first_name + " " + datum.last_name} phone={datum.phone_number} email={datum.email} cover_letter={datum.cover_letter} resume={datum.resume} />)}>View Qualifications</Button>

                            }
                        })} addCheckbox={true} addPagination={true} addSearch={true} />
                </>}
        </div>
    )
}