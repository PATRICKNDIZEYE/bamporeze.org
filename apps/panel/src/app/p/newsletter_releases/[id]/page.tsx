'use client'
import { IWriting } from "@repo/ui/types";
import { Button, Editor, FileInput, Input, Text } from "@repo/ui/units";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import SectionTitle from "../../../../components/sectionTitle";
import Loading from "../../../../components/units/loading";
import { axios, fetcher } from "../../../../utils/axios.config";

export default function EditNewsletter({ params }: { params: { id: string } }) {
    const { data, isLoading, error }: { data: IWriting, isLoading: boolean, error?: any } = useSWR(`/writing/${params.id}`, fetcher)
    const router = useRouter()

    const [thumbnail_image, setThumb] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleUpdateSubscriber = async (release: boolean) => {
        try {
            setLoading(true)
            const res = await axios.put(`/writing/${params.id}`, {
                thumbnail_image,
                title,
                description,
                content,
                "writingType": "NEWSLETTER",
                isReleased: release
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Newsletter updated')
                router.push('/p/newsletter_releases')
            } else {
                throw new Error('Failed to update')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!data) return;
        setThumb(data.thumbnail_image)
        setTitle(data.title)
        setDescription(data.description)
        setContent(data.content)
    }, [data])

    return (
        <>
            {isLoading && <Loading />}
            {error && <span>  Something went wrong </span>}
            {data && <div className="bg-white rounded p-10">
                <SectionTitle title="New newsletter release" description="Add a new newsletter release" />
                <div className="py-4 flex flex-col gap-2 mt-10">
                    <FileInput label="Add thumbnail" setValue={setThumb} value={thumbnail_image} />

                    <Input label="Title" inputType="text" placeholder="Title here" _controller={{
                        value: title,
                        setValue: setTitle,
                        initialValue: title
                    }} />
                    <Input label="Description" inputType="textarea" placeholder="Add a description" _controller={{
                        value: description,
                        setValue: setDescription,
                        initialValue: description
                    }} />
                    <Text variant={'label'}>Body</Text>
                    <Editor value={content} setValue={setContent} />
                    <div className="flex items-center gap-4">
                        <Button loading={loading} onClick={() => handleUpdateSubscriber(true)}>Release</Button>
                        <Button loading={loading} onClick={() => handleUpdateSubscriber(false)} variant={'secondary'}>Save as draft</Button>
                    </div>
                </div>
            </div>}
        </>
    )
}