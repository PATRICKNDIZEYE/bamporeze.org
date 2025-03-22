'use client'
import { IBoardMember } from "@repo/ui/types"
import { Button, FileInput, Input, Text } from "@repo/ui/units"
import Image from "next/image"
import { useState } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"
import ConfirmDelete from "../../../../components/modals/common/confirmDelete"
import SectionTitle from "../../../../components/sectionTitle"
import Loading from "../../../../components/units/loading"
import useModal from "../../../../hooks/useModal"
import { axios, fetcher } from "../../../../utils/axios.config"


interface IEditMemberProps extends IBoardMember {
    onDone?: () => void
}

function EditMember(props: IEditMemberProps) {
    const { setModal } = useModal()
    const [full_name, setFullName] = useState(props.full_name)
    const [role, setRole] = useState(props.role)
    const [profile_picture, setProfilePicture] = useState<string | null>(props.profile_picture)
    const [classification, setClassification] = useState(props.classification)
    const [loading, setLoading] = useState(false)

    const handleEditOfficial = async () => {
        if (full_name == '' || role == '' || profile_picture == '' || classification == null) return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.put(`/officials/${props.id}`, { full_name, role, profile_picture, classification }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Changes saved')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            props.onDone!()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add review" description="Save a new review" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Reviewer Image </Text>
                    <FileInput value={profile_picture} setValue={setProfilePicture} />
                </div>
                <Input<string> placeholder="John doe" _controller={{
                    initialValue: full_name,
                    value: full_name,
                    setValue: setFullName
                }} label="Full names" inputType="text" />
                <Input<string> placeholder="Manager" _controller={{
                    initialValue: role,
                    value: role,
                    setValue: setRole
                }} label="Role" inputType="text" />
                <Input<"BOARD_MEMBER" | "MANAGER"> placeholder="Manager" _controller={{
                    initialValue: classification,
                    value: classification,
                    setValue: setClassification,
                }} label="Role" inputType="select" options={[
                    {
                        value: "BOARD_MEMBER",
                        label: "Board member"
                    },
                    {
                        value: "MANAGER",
                        label: "Manager"
                    },
                ]} />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleEditOfficial}>Save</Button>
            </div>
        </div>
    );
}

function AddMember({ onDone }: { onDone: () => void }) {
    const { setModal } = useModal()
    const [full_name, setFullName] = useState('')
    const [role, setRole] = useState('')
    const [profile_picture, setProfilePicture] = useState<string | null>('')
    const [classification, setClassification] = useState<'BOARD_MEMBER' | 'MANAGER'>('BOARD_MEMBER')
    const [loading, setLoading] = useState(false)

    const handleEditOfficial = async () => {
        if (full_name == '' || role == '' || profile_picture == '' || classification == null) return toast.error('All fields are required')
        try {
            setLoading(true)
            const res = await axios.post(`/officials`, { full_name, role, profile_picture, classification }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Changes saved')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setLoading(false)
            onDone()
        }
    }

    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-4">
            <SectionTitle title="Add review" description="Save a new review" />
            <div className=" flex flex-col  gap-3">
                <div className="flex flex-col gap-1">
                    <Text>Reviewer Image </Text>
                    <FileInput value={profile_picture} setValue={setProfilePicture} />
                </div>
                <Input<string> placeholder="John doe" _controller={{
                    initialValue: full_name,
                    value: full_name,
                    setValue: setFullName
                }} label="Full names" inputType="text" />
                <Input<string> placeholder="Manager" _controller={{
                    initialValue: role,
                    value: role,
                    setValue: setRole
                }} label="Role" inputType="text" />
                <Input<"BOARD_MEMBER" | "MANAGER"> placeholder="Manager" _controller={{
                    initialValue: classification,
                    value: classification,
                    setValue: setClassification,
                }} label="Classification" inputType="select" options={[
                    {
                        value: "BOARD_MEMBER",
                        label: "Board member"
                    },
                    {
                        value: "MANAGER",
                        label: "Manager"
                    },
                ]} />
            </div>
            <div className="flex items-center justify-between gap-6">
                <Button variant={'tertiary'} className="bg-brand-lightblue  rounded-md">Cancel</Button>
                <Button variant={'primary'} className="bg-brand-lightblue  rounded-md" loading={loading} onClick={handleEditOfficial}>Save</Button>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const { setModal } = useModal()

    const { data, isLoading, error, mutate }: { data: IBoardMember[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR('/officials', fetcher)

    const handleDeleteBoardMember = async (id: string) => {
        try {
            const res = await axios.delete(`/officials/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                toast.success('Review deleted')
                setModal(null)
            } else {
                throw new Error('Something went wrong')
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            mutate()
        }
    }
    return (
        <div>
            {isLoading && <Loading />}
            {data && <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <SectionTitle title="Board members" description="Manage board members" />
                    <Button variant={'secondary'} onClick={() => setModal(<AddMember onDone={mutate} />)}>Add</Button>

                </div>
                <div className="flex items-start gap-4 overflow-x-scroll no-scrollbar mb-10">
                    {data.filter(member => member.classification == 'BOARD_MEMBER').map((review) => (
                        <div className="p-6 flex flex-col gap-2 bg-white items-center min-w-[220px] max-w-[220px]">
                            <Image src={review.profile_picture} alt={review.full_name} loading="lazy" width={80} height={80} className="w-20 h-20 object-cover rounded-full" />
                            <div className="flex flex-col items-center gap-2">
                                <Text variant={'heading4'}>{review.full_name}</Text>
                                <Text>{review.role}</Text>
                            </div>
                            <div className="flex justify-end items-center gap-4">

                                <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<EditMember onDone={mutate} {...review} />)}>
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.2203 5.94342L18.7106 5.45314C19.6458 4.51797 19.6458 3.00177 18.7106 2.06661C17.7755 1.13144 16.2593 1.13144 15.3241 2.06661L14.8338 2.55689M18.2203 5.94342L11.5324 12.6314C10.6635 13.5002 9.52875 14.0531 8.30903 14.2019L6.96882 14.3653C6.6464 14.4046 6.37266 14.1309 6.41197 13.8084L6.5754 12.4682C6.72413 11.2485 7.27701 10.1137 8.14586 9.24486L14.8338 2.55689M18.2203 5.94342L14.8338 2.55689" stroke="#0B60B0" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M20 10V15.25C20 17.4591 18.2091 19.25 16 19.25H5.5C3.29086 19.25 1.5 17.4591 1.5 15.25V4.75C1.5 2.54086 3.29086 0.75 5.5 0.75H10.75" stroke="#0B60B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<ConfirmDelete onCancel={() => setModal(null)} onYes={() => handleDeleteBoardMember(review.id)} />)}>
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.9656 16.0684C15.9291 17.6986 14.597 19.0011 12.9664 19.0011H6.03283C4.4022 19.0011 3.07016 17.6986 3.03358 16.0684L2.81815 6.46769C2.78039 4.78492 4.1342 3.40039 5.8174 3.40039H13.1818C14.865 3.40039 16.2188 4.78491 16.1811 6.46769L15.9656 16.0684Z" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M1.5 3.40039H17.4997" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M6.50649 1.70624L6.89201 1.30614C7.0805 1.11052 7.34047 1 7.61212 1H11.3871C11.6588 1 11.9187 1.11052 12.1072 1.30614L12.4927 1.70624C13.1047 2.34136 12.6546 3.4001 11.7726 3.4001H7.2266C6.34462 3.4001 5.89452 2.34136 6.50649 1.70624Z" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <SectionTitle title="Managers" description="Manage the management team" />
                <div className="flex items-start gap-4 overflow-x-scroll no-scrollbar">
                    {data.filter(member => member.classification == 'MANAGER').map((review) => (
                        <div className="p-6 flex flex-col gap-2 bg-white items-center min-w-[220px] max-w-[220px]">
                            <Image src={review.profile_picture} alt={review.full_name} width={80} loading="lazy" height={80} className="w-20 h-20 object-cover rounded-full" />
                            <div className="flex flex-col items-center gap-2">
                                <Text variant={'heading4'}>{review.full_name}</Text>
                                <Text>{review.role}</Text>
                            </div>
                            <div className="flex justify-end items-center gap-4">

                                <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<EditMember {...review} />)}>
                                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.2203 5.94342L18.7106 5.45314C19.6458 4.51797 19.6458 3.00177 18.7106 2.06661C17.7755 1.13144 16.2593 1.13144 15.3241 2.06661L14.8338 2.55689M18.2203 5.94342L11.5324 12.6314C10.6635 13.5002 9.52875 14.0531 8.30903 14.2019L6.96882 14.3653C6.6464 14.4046 6.37266 14.1309 6.41197 13.8084L6.5754 12.4682C6.72413 11.2485 7.27701 10.1137 8.14586 9.24486L14.8338 2.55689M18.2203 5.94342L14.8338 2.55689" stroke="#0B60B0" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M20 10V15.25C20 17.4591 18.2091 19.25 16 19.25H5.5C3.29086 19.25 1.5 17.4591 1.5 15.25V4.75C1.5 2.54086 3.29086 0.75 5.5 0.75H10.75" stroke="#0B60B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<ConfirmDelete onCancel={() => setModal(null)} onYes={() => handleDeleteBoardMember(review.id)} />)}>
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.9656 16.0684C15.9291 17.6986 14.597 19.0011 12.9664 19.0011H6.03283C4.4022 19.0011 3.07016 17.6986 3.03358 16.0684L2.81815 6.46769C2.78039 4.78492 4.1342 3.40039 5.8174 3.40039H13.1818C14.865 3.40039 16.2188 4.78491 16.1811 6.46769L15.9656 16.0684Z" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M1.5 3.40039H17.4997" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M6.50649 1.70624L6.89201 1.30614C7.0805 1.11052 7.34047 1 7.61212 1H11.3871C11.6588 1 11.9187 1.11052 12.1072 1.30614L12.4927 1.70624C13.1047 2.34136 12.6546 3.4001 11.7726 3.4001H7.2266C6.34462 3.4001 5.89452 2.34136 6.50649 1.70624Z" stroke="#DC5436" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>}
        </div>
    )
}