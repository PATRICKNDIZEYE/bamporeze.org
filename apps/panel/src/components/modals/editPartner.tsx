'use client'
import { IPartnerCompany } from "@repo/ui/types";
import { Button, FileInput, Input, Text } from "@repo/ui/units";
import { useState } from "react";
import toast from "react-hot-toast";
import useModal from "../../hooks/useModal";
import { axios } from "../../utils/axios.config";
import SectionTitle from "../sectionTitle";


interface IEditPartnerProps extends IPartnerCompany {
    onDone: () => void
}
export default function EditPartner(props: IEditPartnerProps) {
    const { setModal } = useModal()
    const [company_name, setCompanyName] = useState(props.company_name)
    const [company_website, setCompanyWebsite] = useState(props.company_website as string)
    const [company_logo, setCompanyLogo] = useState<string | null>(props.company_logo)
    const [loading, setLoading] = useState(false)

    const handleUpdateCompany = async () => {
        if (company_name == '' || company_website == '' || company_logo == null) return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.put(`/partner-companies/${props.id}`, { company_logo, company_name, company_website }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Partner added')
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
            <SectionTitle title="Edit details" description="Click on save after modifying" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Company Logo</Text>
                    <FileInput value={company_logo} setValue={setCompanyLogo} />
                </div>
                <Input<string> placeholder="Company ." _controller={{
                    initialValue: company_name,
                    value: company_name,
                    setValue: setCompanyName
                }} label="Company name" inputType="text" />
                <Input<string> placeholder="Company website" _controller={{
                    initialValue: company_website,
                    value: company_website,
                    setValue: setCompanyWebsite
                }} label="Company website" inputType="text" />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md" onClick={(e) => setModal(null)}>Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleUpdateCompany}>Save</Button>
            </div>
        </div>
    );
}