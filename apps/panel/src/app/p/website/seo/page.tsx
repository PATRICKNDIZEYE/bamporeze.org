'use client'
import { TrashIcon } from "@radix-ui/react-icons";
import { ISeoKeyword } from "@repo/ui/types";
import { Button, Input, Text } from "@repo/ui/units";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import SectionTitle from "../../../../components/sectionTitle";
import Loading from "../../../../components/units/loading";
import useModal from "../../../../hooks/useModal";
import { axios, fetcher } from "../../../../utils/axios.config";

function AddKeyword({ onDone }: { onDone: () => void }) {
    const { setModal } = useModal()
    const [word, setKeyword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddKeyword = async () => {
        if (word == '') return toast.error('Fill in the fields')
        try {
            setLoading(true)
            const res = await axios.post('/seo-keywords', { word }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Keyword added!')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            onDone()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add SEO Keyword" description="Add word and hit save" />
            <div className=" flex flex-col  gap-3">

                <Input<string> placeholder="Word here" _controller={{
                    initialValue: word,
                    value: word,
                    setValue: setKeyword
                }} label="Keyword" inputType="text" />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddKeyword}>Save</Button>
            </div>
        </div>
    );
}








export default function ContactsPage() {
    const { setModal } = useModal()
    const { data, isLoading, error, mutate }: { data: ISeoKeyword[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR("/seo-keywords", fetcher)


    const handleDeleteKeyword = async (id: string) => {
        try {
            const res = await axios.delete(`/seo-keywords/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Keyword deleted!')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            mutate()
        }
    }

    return (
        <div>
            <SectionTitle title="SEO" description="Search engine keywords" />
            {isLoading && <Loading />}
            {data && <div className="w-2/3 flex flex-wrap gap-2 mt-8">

                {data.map((keyword) => (
                    <div className="h-[50px] flex items-center  px-4 rounded bg-white gap-2">

                        <Text> {keyword.word} </Text>
                        <button className="w-6 h-6 bg-red-100 rounded flex items-center justify-center" onClick={() => handleDeleteKeyword(keyword.id)}><TrashIcon color="#ff0000" /></button>
                    </div>
                ))}
                <Button variant={'tertiary'} onClick={() => setModal(<AddKeyword onDone={mutate} />)}>+ Add</Button>
            </div>}
        </div>
    )
}

