'use client'
import { IPartnerCompany, IReview, ISlide } from "@repo/ui/types";
import { Button, Text } from "@repo/ui/units";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import AddReview from "../../../../components/modals/addReview";
import AddHomepageSlider from "../../../../components/modals/addSlider";
import ConfirmDelete from "../../../../components/modals/common/confirmDelete";
import EditPartner from "../../../../components/modals/editPartner";
import EditReview from "../../../../components/modals/editReview";
import EditHomepageSlider from "../../../../components/modals/editSlider";
import SectionTitle from "../../../../components/sectionTitle";
import Loading from "../../../../components/units/loading";
import useGlobalCtx from "../../../../hooks/useGlobalContext";
import useModal from "../../../../hooks/useModal";
import { axios, fetcher } from "../../../../utils/axios.config";
import AddPartner from "./addPartner";

export function HomepageSliders() {
    const { setModal } = useModal()
    const { homepageSliders, setHomepageSliders } = useGlobalCtx()
    const { data, isLoading, error, mutate }: { data: ISlide[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR('/homepage-sliders', fetcher)

    useEffect(() => {
        if (data) setHomepageSliders(data)
    }, [data])
    return (
        <div>
            {isLoading ? <Loading />
                :
                data && <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <SectionTitle title="Sliders" description="Customize landing page Sliders" />
                        <Button variant={'secondary'} onClick={() => setModal(<AddHomepageSlider onDone={mutate} />)}>Add slider</Button>
                    </div>
                    <div className="flex items-start gap-4 overflow-x-scroll no-scrollbar">
                        {homepageSliders.map((slider) => (
                            <div className=" overflow-hidden pt-36 min-w-[480px] bg-red-50  z-0 relative" style={{
                                backgroundImage: `url(${slider.background_image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <button className="w-8 h-8 flex items-center justify-center text-white absolute top-6 right-6 rounded-full bg-black/80 hover:bg-black/20" onClick={() => setModal(<EditHomepageSlider onDone={mutate} {...slider} />)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                                    </svg>
                                </button>
                                <div className="p-6 flex flex-col gap-2 bg-gradient-to-t from-black to-transparent">
                                    <Text variant={'heading4'} className="text-brand-white">{slider.title}</Text>
                                    <Text className="text-brand-white-80">{slider.description}</Text>
                                </div>
                            </div>
                        ))
                        }

                    </div>
                </div>}
        </div>
    )
}

export function HomepageReviews() {
    const { setModal } = useModal()
    const { homepageReviews, setHomepageReviews } = useGlobalCtx()
    const { data, isLoading, error, mutate }: { data: IReview[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR('/reviews', fetcher)

    useEffect(() => {
        if (data) setHomepageReviews(data)
    }, [data])

    const handleDeleteReview = async (id: string) => {
        try {
            const res = await axios.delete(`/reviews/${id}`, {
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
            {isLoading ? <Loading />
                : homepageReviews && <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <SectionTitle title="Reviews" description="Manage users  feedback and reviews" />
                        <Button variant={'secondary'} onClick={() => setModal(<AddReview onDone={mutate} />)}>Add review</Button>

                    </div>
                    <div className="flex items-start gap-4 overflow-x-scroll no-scrollbar">
                        {homepageReviews.map((review) => (
                            <div className="p-6 flex flex-col gap-2 bg-white min-w-[480px] max-w-[480px]">
                                <Text variant={'heading4'}>{review.reviewer_company}</Text>
                                <Text>{review.review_message}</Text>
                                <div className="flex items-center gap-2">
                                    <Image src={review.reviewer_image} loading="lazy" alt={review.reviewer_name} width={40} height={40} className="w-10 h-10 object-cover rounded-full" />
                                    <Text variant={'label'} className="text-brand-blackblue font-semibold">{review.reviewer_name}</Text>
                                </div>
                                <div className="flex justify-end items-center gap-4">

                                    <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<EditReview onDone={mutate} {...review} />)}>
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.2203 5.94342L18.7106 5.45314C19.6458 4.51797 19.6458 3.00177 18.7106 2.06661C17.7755 1.13144 16.2593 1.13144 15.3241 2.06661L14.8338 2.55689M18.2203 5.94342L11.5324 12.6314C10.6635 13.5002 9.52875 14.0531 8.30903 14.2019L6.96882 14.3653C6.6464 14.4046 6.37266 14.1309 6.41197 13.8084L6.5754 12.4682C6.72413 11.2485 7.27701 10.1137 8.14586 9.24486L14.8338 2.55689M18.2203 5.94342L14.8338 2.55689" stroke="#0B60B0" stroke-width="1.5" stroke-linejoin="round" />
                                            <path d="M20 10V15.25C20 17.4591 18.2091 19.25 16 19.25H5.5C3.29086 19.25 1.5 17.4591 1.5 15.25V4.75C1.5 2.54086 3.29086 0.75 5.5 0.75H10.75" stroke="#0B60B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<ConfirmDelete onCancel={() => setModal(null)} onYes={() => handleDeleteReview(review.id)} />)}>
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
export function PartnerCompanies() {
    const { setModal } = useModal()
    const { homepagePartners, setHomepagePartners } = useGlobalCtx()
    const { data, isLoading, error, mutate }: { data: IPartnerCompany[], isLoading: boolean, error?: Error, mutate: () => void } = useSWR('/partner-companies', fetcher)

    useEffect(() => {
        if (data) setHomepagePartners(data)
    }, [data])

    const handleDeletePartner = async (id: string) => {
        try {
            const res = await axios.delete(`/partner-companies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 201) {
                toast.success('Partner deleted')
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
            {isLoading ? <Loading /> :
                data && <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <SectionTitle title="Partners" description="Manage  companies in partnership with hcakigali" />
                        <Button variant={'secondary'} onClick={() => setModal(<AddPartner onDone={mutate} />)}>Add company</Button>

                    </div>
                    <div className=" gap-4 overflow-x-scroll grid grid-cols-4 no-scrollbar">
                        {data.map((partner) => (
                            <div className="p-6 flex flex-col gap-2 bg-white">
                                <div className="flex flex-col items-enter gap-2">
                                    <Image src={partner.company_logo} loading="lazy" alt={partner.company_name} width={60} height={60} className="w-16 h-16 object-contain rounded" />
                                    <div className="flex flex-col gap-1">

                                        <Text variant={'heading4'}>{partner.company_name}</Text>
                                        <a href={partner.company_website}><Text variant={'paragraph'}>{partner.company_website}</Text></a>
                                    </div>
                                </div>
                                <div className="flex justify-end items-center gap-4">

                                    <button className="w-8 h-8 flex items-center justify-center rounded gap-2 "
                                        onClick={() => setModal(<EditPartner onDone={mutate} {...partner} />)}
                                    >
                                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.2203 5.94342L18.7106 5.45314C19.6458 4.51797 19.6458 3.00177 18.7106 2.06661C17.7755 1.13144 16.2593 1.13144 15.3241 2.06661L14.8338 2.55689M18.2203 5.94342L11.5324 12.6314C10.6635 13.5002 9.52875 14.0531 8.30903 14.2019L6.96882 14.3653C6.6464 14.4046 6.37266 14.1309 6.41197 13.8084L6.5754 12.4682C6.72413 11.2485 7.27701 10.1137 8.14586 9.24486L14.8338 2.55689M18.2203 5.94342L14.8338 2.55689" stroke="#0B60B0" stroke-width="1.5" stroke-linejoin="round" />
                                            <path d="M20 10V15.25C20 17.4591 18.2091 19.25 16 19.25H5.5C3.29086 19.25 1.5 17.4591 1.5 15.25V4.75C1.5 2.54086 3.29086 0.75 5.5 0.75H10.75" stroke="#0B60B0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded gap-2 " onClick={() => setModal(<ConfirmDelete onCancel={() => setModal(null)} onYes={() => handleDeletePartner(partner.id)} />)}>
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