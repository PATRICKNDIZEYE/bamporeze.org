'use client'
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Text } from "@repo/ui/units";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";
import SectionTitle from "../../../components/sectionTitle";
import Loading from "../../../components/units/loading";
import CustomTable from "../../../components/units/table";
import useGlobalCtx from "../../../hooks/useGlobalContext";
import { fetcher } from "../../../utils/axios.config";

export default function NewsletterReleases() {
    const { newsletterReleases, setNewsletterReleases } = useGlobalCtx()
    const { data, error, isLoading } = useSWR('/writing/newsletter', fetcher)

    useEffect(() => {
        if (data) setNewsletterReleases(data)
    }, [data])
    return (
        <div className="p-5">
            {
                isLoading ? <Loading />
                    : newsletterReleases &&
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <SectionTitle title="Newsletter Releases" description="All released newsletters" />
                            <Link href={'/p/newsletter_releases/new'}> <Button variant={'secondary'}>New release</Button></Link>
                        </div>
                        <div>
                            <CustomTable columns={['Title', 'reads', 'status', 'actions']}
                                data={newsletterReleases.map(datum => {
                                    return {
                                        title: <div className="flex items-center gap-4">
                                            <Image src={datum.thumbnail_image} alt={datum.title} loading="lazy" width={400} height={400} className="w-[100px] h-[80px] object-cover" />
                                            <div className="flex flex-col gap-2">
                                                <Text variant={'heading4'}>{datum.title} </Text>
                                                <Text variant={'paragraph'}>{datum.description.slice(1, 100)} </Text>
                                            </div></div>,
                                        reads: datum.isReleased ? <Text variant={'paragraph'}>{datum.reads}&nbsp;Reads </Text> : <span className="text-slate-600 bg-slate-100 p-1 rounded-md">Not readable</span>,
                                        status: datum.isReleased ? <span className="text-green-600 bg-green-100 p-1 rounded-md">Released</span> : <span className="text-slate-600 bg-slate-100 p-1 rounded-md">Drafts</span>,
                                        actions: <div className="flex items-center gap-2"><Link href={`/p/newsletter_releases/${datum.id}`} className="w-6 h-6 bg-brand-darkblue-10 flex items-center justify-center rounded-md"> <Pencil1Icon /></Link></div>
                                    }
                                })} addCheckbox={true} addPagination={true} addSearch={true} />
                        </div>
                    </div>
            }
        </div>
    )
}