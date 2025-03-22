'use client'
import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";

const AddPhoto: FC<{ onDone?: () => void }> = ({ onDone }) => {
    const { setModal } = useModal()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleAddPhoto = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`/gallery`, { title, description, image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Photo added !')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            onDone!()
        }
    }


    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add photo" description="Add picture to gallery" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Image</Text>
                    <FileInput value={image} setValue={setImage} />
                </div>
                <Input<string> placeholder="Title goes here" _controller={{
                    initialValue: title,
                    value: title,
                    setValue: setTitle
                }} label="Title" inputType="text" />
                <Input<string> placeholder="What is this photo about ?" _controller={{
                    initialValue: description,
                    value: description,
                    setValue: setDescription
                }} label="Description" inputType="textarea" />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddPhoto}>Save</Button>
            </div>
        </div>
    );
}

export default AddPhoto