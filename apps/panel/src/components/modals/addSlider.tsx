'use client'
import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";

const AddHomepageSlider: FC<{ onDone?: () => void }> = ({ onDone }) => {
    const { setModal } = useModal()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [background_image, setThumbnailImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleUpdateSlider = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`/homepage-sliders`, { title, description, background_image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Slider added !')
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
            <SectionTitle title="Add homepage slider" description="Add another homepage slider" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Bacground Image</Text>
                    <FileInput value={background_image} setValue={setThumbnailImage} />
                </div>
                <Input<string> placeholder="Title goes here" _controller={{
                    initialValue: title,
                    value: title,
                    setValue: setTitle
                }} label="Slider title" inputType="text" />
                <Input<string> placeholder="Add a subtitle" _controller={{
                    initialValue: description,
                    value: description,
                    setValue: setDescription
                }} label="Slider subtitle" inputType="textarea" />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleUpdateSlider}>Save</Button>
            </div>
        </div>
    );
}

export default AddHomepageSlider