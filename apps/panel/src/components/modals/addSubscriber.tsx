'use client'
import { Button, Input } from "@repo/ui/units";
import { useState } from "react";
import toast from "react-hot-toast";
import useGlobalCtx from "../../hooks/useGlobalContext";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";

export default function AddSubscriber() {
    const { setNewsletterSubs, newsletterSubs } = useGlobalCtx()
    const { setModal } = useModal()
    const [full_name, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddSubscriber = async () => {
        if (full_name == '' || email == '') return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.post('/newsletter_subscribers', { full_name, email })
            if (res.status == 200) {
                toast.success('Subscriber added successfully')
                const newSub = res.data;
                setNewsletterSubs([...newsletterSubs, newSub])

                setModal(null)
            } else {
                throw new Error('Failed to add subscriber')
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to add subscriber')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add Subscriber" description="Add a new subscriber to the newsletter" />
            <div className="flex  flex-col items-center gap-3">
                <Input<string> placeholder="John doe" _controller={{
                    initialValue: full_name,
                    value: full_name,
                    setValue: setFullname
                }} label="Full name" inputType="text" />
                <Input<string> placeholder="johndoe@gmail.com" _controller={{
                    initialValue: email,
                    value: email,
                    setValue: setEmail
                }} label="Email address" inputType="email" />

            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddSubscriber}>Add</Button>

            </div>
        </div>
    );
}