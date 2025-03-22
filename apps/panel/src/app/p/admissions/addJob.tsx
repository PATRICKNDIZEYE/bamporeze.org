'use client'
import { IJobPosition } from "@repo/ui/types";
import { Button, Input, Text } from "@repo/ui/units";
import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";
import SectionTitle from "../../../components/sectionTitle";
import useGlobalCtx from "../../../hooks/useGlobalContext";
import useModal from "../../../hooks/useModal";
import { axios } from "../../../utils/axios.config";
import { jobTypes } from "../../../utils/jobTypes";

const Editor = dynamic(() => import('@repo/ui/editor'), { ssr: false })



export default function AddJobPosition({ onDone }: { onDone?: () => void }) {
    const { setModal } = useModal()
    const { jobs, setJobs } = useGlobalCtx()
    const [title, setTitle] = useState('')
    const [type, setJobType] = useState('')
    const [location, setJobLocation] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAddJob = async () => {
        if (title == '' || type == '' || description == '' || location == '') return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.post('/jobs', { title, type, isOpen, description, location }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Job added successfully')
                const newJob: IJobPosition = {
                    title: res.data['title'],
                    applications: [],
                    description: res.data['description'],
                    id: res.data['id'],
                    isOpen: res.data['isOpen'],
                    location: res.data['location'],
                    type: res.data['type']
                }
                setJobs([...jobs, newJob])
                setModal(null)
            } else {
                throw new Error('Failed to add job')
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to add subscriber')
        } finally {
            setLoading(false)
            onDone!()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="New Program" description="Add Program" />
            <div className="flex  flex-col items-center gap-3">
                <Input<string> placeholder="Bachelor of Science in Computer Science" _controller={{
                    initialValue: title,
                    value: title,
                    setValue: setTitle
                }} label="Program title" inputType="text" />

                <div className="flex items-center w-full justify-between gap-6">
                    <Input<string> placeholder="Full time" _controller={{
                        initialValue: type,
                        value: type,
                        setValue: setJobType
                    }} label="Program type" inputType="select" options={jobTypes} />
                    <Input<string> placeholder="Kigali, Rwanda" _controller={{
                        initialValue: location,
                        value: location,
                        setValue: setJobLocation
                    }} label="Program location" inputType="text" />
                </div>
                <Editor setValue={setDescription} value={description} />
                <div className="flex  w-full my-4">
                    <input id="default-checkbox" type="checkbox" checked={isOpen} onChange={() => setIsOpen(!isOpen)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        <Text variant='label'>This program is currently open</Text>
                    </label>
                </div>
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddJob}>Add</Button>
            </div>
        </div>
    );
}