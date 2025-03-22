'use client'
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { IWriting } from "@repo/ui/types";
import { Button, Text } from "@repo/ui/units";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import ConfirmDelete from "../../../components/modals/common/confirmDelete";
import SectionTitle from "../../../components/sectionTitle";
import Loading from "../../../components/units/loading";
import CustomTable from "../../../components/units/table";
import useGlobalCtx from "../../../hooks/useGlobalContext";
import useModal from "../../../hooks/useModal";
import { axios, fetcher } from "../../../utils/axios.config";

export default function NewsletterReleases() {
    const { setModal } = useModal()
    const { blogs, setBlogs } = useGlobalCtx()
    const { data, error, isLoading }: { data: IWriting[], error?: Error, isLoading: boolean } = useSWR('/writing/blogs', fetcher)

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/writing/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setBlogs(blogs.filter(blog => blog.id != id))
            toast.success('Blog deleted')
            setModal(null)
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        if (data) setBlogs(data)
    }, [data])
    return (
        <div className="p-5">
            {
                isLoading ? <Loading />
                    : blogs &&
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <SectionTitle title="Website blogs" description="View all blogs here" />
                            <Link href={'/p/blog/new'}> <Button variant={'secondary'}>New blog</Button></Link>
                        </div>
                        <div>
                            <CustomTable columns={['Title', 'reads', 'status', 'actions']}
                                data={blogs.map(datum => {
                                    return {
                                        title: <div className="flex items-center gap-4">
                                            <Image src={datum.thumbnail_image} loading="lazy" alt={datum.title} width={400} height={400} className="w-[100px] h-[80px] object-cover" />
                                            <div className="flex flex-col gap-2">
                                                <Text variant={'heading4'}>{datum.title} </Text>
                                                <Text variant={'paragraph'}>{datum.description.slice(1, 100)} </Text>
                                            </div></div>,
                                        reads: datum.isReleased ? <Text variant={'paragraph'}>{datum.reads}&nbsp;Reads </Text> : <span className="text-slate-600 bg-slate-100 p-1 rounded-md">Not readable</span>,
                                        status: datum.isReleased ? <span className="text-green-600 bg-green-100 p-1 rounded-md">Released</span> : <span className="text-slate-600 bg-slate-100 p-1 rounded-md">Drafts</span>,
                                        actions: <div className="flex items-center gap-2"><Link href={`/p/blog/${datum.id}`} className="w-6 h-6 bg-brand-darkblue-10 flex items-center justify-center rounded-md"> <Pencil1Icon /></Link><button className="w-6 h-6 flex items-center justify-center rounded bg-red-100" onClick={() => setModal(<ConfirmDelete onYes={() => handleDelete(datum.id)} onCancel={() => setModal(null)} />)}><TrashIcon color="#ff0000" /></button></div>
                                    }
                                })} addCheckbox={true} addPagination={true} addSearch={true} />
                        </div>
                    </div>
            }
        </div>
    )
}