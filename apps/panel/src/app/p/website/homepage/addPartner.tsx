import { Button, FileInput, Input, Text } from "@repo/ui/units"
import { useState } from "react"
import toast from "react-hot-toast"
import SectionTitle from "../../../../components/sectionTitle"
import useModal from "../../../../hooks/useModal"
import { axios } from "../../../../utils/axios.config"

export default function AddPartner({ onDone }: { onDone?: () => void }) {
    const { setModal } = useModal()
    const [company_name, setCompanyName] = useState('')
    const [company_website, setCompanyWebsite] = useState('')
    const [company_logo, setCompanyLogo] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleAddCompany = async () => {
        if (company_name == '' || company_website == '' || company_logo == null) return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.post('/partner-companies', { company_logo, company_name, company_website }, {
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
            onDone!()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add partner company" description="Fill in all fields" />
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
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleAddCompany}>Save</Button>
            </div>
        </div>
    );
}