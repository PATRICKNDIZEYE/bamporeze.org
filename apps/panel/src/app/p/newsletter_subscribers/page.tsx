'use client'
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui/units";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import AddSubscriber from "../../../components/modals/addSubscriber";
import ConfirmDelete from "../../../components/modals/common/confirmDelete";
import SectionTitle from "../../../components/sectionTitle";
import CustomTable from "../../../components/units/table";
import useGlobalCtx from "../../../hooks/useGlobalContext";
import useModal from "../../../hooks/useModal";
import { axios, fetcher } from "../../../utils/axios.config";
import formatDate from "../../../utils/formatDate";

export type INewsLetterSubscriber = {
    id: string
    email: string
    createdAt: string
    full_name: string
} | any





export default function NewsletterSubscribers() {

    const { data, error, isLoading, mutate } = useSWR('/newsletter_subscribers', fetcher)
    const { setModal } = useModal()
    const { newsletterSubs, setNewsletterSubs } = useGlobalCtx()

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/newsletter_subscribers/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success('Subscriber removed')
            setNewsletterSubs(newsletterSubs.filter(sub => sub.id != id))
            setModal(null)
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        if (data) {
            setNewsletterSubs(data)
        }
    }, [data])


    if (error) return <div>failed to load <button onClick={() => mutate('/newsletter_subscribers')}>retry</button></div>
    if (isLoading) return <div>isLoading</div>
    if (newsletterSubs) return (
        <div className="flex p-6 rounded-md  flex-col gap-6">
            <div className="flex items-center justify-between">
                <SectionTitle title="Newsletter subscribers" description="People who subscribed to newsletter" />
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md p-2" onClick={() => setModal(<AddSubscriber />)}>Add </Button>
            </div>

            <div>
                <CustomTable columns={['Subscription data', 'name', 'Email', 'Actions']}
                    data={newsletterSubs.map(datum => {
                        return {
                            date: formatDate(datum.createdAt),
                            name: datum.full_name,
                            email: <a target="_blank" href={`mailto:${datum.email}`} className="hover:underline underline-offset-4"> {datum.email} </a>,
                            actions: <div className="flex items-center gap-2"><button className="w-6 h-6 flex items-center justify-center rounded bg-red-100" onClick={() => setModal(<ConfirmDelete onYes={() => handleDelete(datum.id)} onCancel={() => setModal(null)} />)}><TrashIcon color="#ff0000" /></button></div>
                        }
                    })} addCheckbox={true} addPagination={true} addSearch={true} />
            </div>
        </div>
    )
}