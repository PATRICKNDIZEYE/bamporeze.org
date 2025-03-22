'use client'
import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { useState } from "react";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";

export default function AddReview({ onDone }: { onDone?: () => void }) {
    const { setModal } = useModal()
    const [reviewer_name, setReviewerName] = useState('')
    const [reviewer_company, setReviewerCompany] = useState('')
    const [reviewer_image, setReviewerImage] = useState<string | null>(null)
    const [review_message, setReviewerMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddReview = async () => {
        if (reviewer_name == '' || review_message == '' || reviewer_company == '' || reviewer_image == null) return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.post('/reviews', { reviewer_company, reviewer_image, reviewer_name, review_message }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Review saved')
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
            <SectionTitle title="Add review" description="Save a new review" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Reviewer Image </Text>
                    <FileInput value={reviewer_image} setValue={setReviewerImage} />
                </div>
                <Input<string> placeholder="John doe" _controller={{
                    initialValue: reviewer_name,
                    value: reviewer_name,
                    setValue: setReviewerName
                }} label="Reviewer name" inputType="text" />
                <Input<string> placeholder="Company ." _controller={{
                    initialValue: reviewer_company,
                    value: reviewer_company,
                    setValue: setReviewerCompany
                }} label="Company" inputType="text" />
                <Input<string> placeholder="Type here" _controller={{
                    initialValue: review_message,
                    value: review_message,
                    setValue: setReviewerMessage
                }} label="Review" inputType="textarea" />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddReview}>Save</Button>
            </div>
        </div>
    );
}