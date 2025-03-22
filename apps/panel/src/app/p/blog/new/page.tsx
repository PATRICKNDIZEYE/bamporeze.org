'use client'
import { Button, FileInput, Input, Text } from '@repo/ui/units';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import toast from 'react-hot-toast';
import SectionTitle from '../../../../components/sectionTitle';
import { axios } from '../../../../utils/axios.config';
const Editor = dynamic(() => import('@repo/ui/editor'), { ssr: false })


export default function NewNewsletterRelease() {
    const router = useRouter()
    const [thumbnail_image, setThumb] = useState<string | null>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)



    const handleSaveBlog = async (release: boolean) => {
        try {
            setLoading(true)
            const res = await axios.post('/writing', {
                thumbnail_image,
                title,
                description,
                content,
                "writingType": "BLOG",
                isReleased: release
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Blog saved successfully')
                router.push('/p/blog')
            } else {
                throw new Error('Failed to save')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="bg-white rounded p-10">
            <SectionTitle title='New blog' description='Add a new blog post' />
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
                    <Button loading={loading} onClick={() => handleSaveBlog(true)}>Release</Button>
                    <Button loading={loading} onClick={() => handleSaveBlog(false)} variant={'secondary'}>Save as draft</Button>
                </div>
            </div>
        </div>
    )
}
