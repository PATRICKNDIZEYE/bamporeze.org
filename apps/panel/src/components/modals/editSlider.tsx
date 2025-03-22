'use client'
import { ISlide } from "@repo/ui/types";
import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";

interface IEditSlideProps extends ISlide {
    onDone: () => void
}
const EditHomepageSlider: FC<IEditSlideProps> = (props: IEditSlideProps) => {
    const { setModal } = useModal()
    const [title, setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [background_image, setThumbnailImage] = useState<string | null>(props.background_image)
    const [loading, setLoading] = useState(false)

    const handleUpdateSlider = async () => {
        try {
            setLoading(true)
            const res = await axios.put(`/homepage-sliders/${props.id}`, { title, description, background_image }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Slider updated successfully')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            props.onDone()
        }
    }
    const handleDeleteSlider = async () => {
        try {
            setLoading(true)
            const res = await axios.delete(`/homepage-sliders/${props.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Slider deleted')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            props.onDone()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Edit slider" description="Customize your homepage look" />
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
                <Button variant={'tertiary'} className="bg-red-100  text-red-500  rounded-md" onClick={handleDeleteSlider}>Delete Slider</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleUpdateSlider}>Save</Button>
            </div>
        </div>
    );
}

export default EditHomepageSlider