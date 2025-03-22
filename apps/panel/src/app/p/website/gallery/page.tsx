'use client'
import { TrashIcon } from "@radix-ui/react-icons"
import { IPhoto } from "@repo/ui/types"
import { Button, Text } from "@repo/ui/units"
import Image from "next/image"
import toast from "react-hot-toast"
import useSWR from "swr"
import AddPhoto from "../../../../components/modals/addPhoto"
import ConfirmDelete from "../../../../components/modals/common/confirmDelete"
import SectionTitle from "../../../../components/sectionTitle"
import Loading from "../../../../components/units/loading"
import useModal from "../../../../hooks/useModal"
import { axios, fetcher } from "../../../../utils/axios.config"

export default function Gallery() {
    const { setModal } = useModal()
    const { data, isLoading, error, mutate }: { data: IPhoto[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR('/gallery', fetcher)

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/gallery/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            toast.success('Photo removed')
            setModal(null)
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            mutate()
        }
    }

    return (
        <div>
            {isLoading ? <Loading />
                :
                data && <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <SectionTitle title="Gallery" description="Manage your website gallery" />
                        <Button variant={'secondary'} onClick={() => setModal(<AddPhoto onDone={mutate} />)}>Add photo</Button>
                    </div>
                    <div className=" gap-4 overflow-x-scroll grid grid-cols-4 no-scrollbar">
                        {data.map((item) => (
                            <div className="flex flex-col gap-2  bg-white rounded-md overflow-hidden hover:scale-105 duration-100 border border-r-brand-darkblue-5">
                                <Image src={item.image} alt={item.title} loading="lazy" width={400} height={500} className="h-[260px] object-cover bg-brand-darkblue-10" />
                                <div className=" flex flex-col gap-2 px-6 py-2">
                                    <Text variant={'heading4'}>{item.title}</Text>
                                    <Text >{item.description.slice(0, 100)}...</Text>
                                    <button className="w-10 h-10 rounded-md flex items-center justify-center bg-red-100" onClick={() => setModal(<ConfirmDelete onYes={() => handleDelete(item.id)} onCancel={() => setModal(null)} />)}><TrashIcon color="#ff0000" /></button>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>}
        </div>
    )
}
