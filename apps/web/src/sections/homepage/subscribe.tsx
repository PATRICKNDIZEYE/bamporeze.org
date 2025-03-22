'use client'

import { Button, Input } from '@repo/ui/units'
import axios from 'axios'
import { useEffect, useState } from 'react'
import WebSection from '../../components/layouts/websection'
import { WithLocaleProp } from '../../components/units/navbar'
import SectionTitle from '../../components/units/sectionTitle'
import { getDictionary } from '../../utils/dictionary'

export default function Subscribe({ locale }: WithLocaleProp) {
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const dictionary = getDictionary(locale)
  const [subscribed, setSubscribed] = useState('not-subscribed')

  useEffect(() => {
    if (localStorage.getItem('subscribed') == 'subscribed')
      setSubscribed('subscribed')
  }, [])

  const handleSubscribe = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_REMOTE_BASEURL}/newsletter_subscribers`, {
        full_name: full_name,
        email: email,
      })
      if (res.data && res.data.status === 200) {
        localStorage.setItem('subscribed', 'subscribed')
        setSubscribed('subscribed')
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <WebSection
      about="Subscribe to our newsletter"
      className=" py-16 flex items-center  md:flex-row msm:flex-col justify-between align-items-end bg-[#F7F8F8]/40"
      animate={false}
    >
      {subscribed == 'subscribed' ? (
        <div className="flex items-center justify-center w-full  fade-in">
          <SectionTitle
            direction="vertical"
            title={dictionary.pages.home.subscribe_section.sub_success.title}
            subtitle={
              dictionary.pages.home.subscribe_section.sub_success.subtitle
            }
            suptitle={
              dictionary.pages.home.subscribe_section.sub_success.suptitle
            }
          />
        </div>
      ) : (
        <div
          className="flex items-center msm:flex-col md:flex-row justify-between  w-full gap-10"
          id="subscribe"
        >
          <SectionTitle
            direction="horizontal"
            title={dictionary.pages.home.subscribe_section.title}
            subtitle={dictionary.pages.home.subscribe_section.subtitle}
            suptitle={dictionary.pages.home.subscribe_section.suptitle}
          />
          <div className=" msm:w-full  md:w-1/3 p-6  flex flex-col gap-4 rounded-lg bg-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3.75H6.912C6.43095 3.75009 5.96259 3.90435 5.57564 4.19015C5.1887 4.47595 4.90354 4.87824 4.762 5.338L2.35 13.177C2.28394 13.3911 2.25023 13.6139 2.25 13.838V18C2.25 18.5967 2.48705 19.169 2.90901 19.591C3.33097 20.0129 3.90326 20.25 4.5 20.25H19.5C20.0967 20.25 20.669 20.0129 21.091 19.591C21.5129 19.169 21.75 18.5967 21.75 18V13.838C21.75 13.614 21.716 13.391 21.65 13.177L19.24 5.338C19.0985 4.87824 18.8133 4.47595 18.4264 4.19015C18.0394 3.90435 17.5711 3.75009 17.09 3.75H15M2.25 13.5H6.11C6.5278 13.5001 6.93731 13.6165 7.29267 13.8363C7.64803 14.056 7.9352 14.3703 8.122 14.744L8.378 15.256C8.56488 15.6299 8.8522 15.9443 9.20775 16.164C9.5633 16.3837 9.97303 16.5001 10.391 16.5H13.609C14.027 16.5001 14.4367 16.3837 14.7922 16.164C15.1478 15.9443 15.4351 15.6299 15.622 15.256L15.878 14.744C16.0649 14.3701 16.3522 14.0557 16.7078 13.836C17.0633 13.6163 17.473 13.4999 17.891 13.5H21.75M12 3V11.25M12 11.25L9 8.25M12 11.25L15 8.25"
                stroke="#40A2D8"
                stroke-width="1.5"
                stroke-linecap="round"
                strokeLinecap="round"
              />
            </svg>
            <Input<string>
              _controller={{
                initialValue: full_name,
                value: full_name,
                setValue: setFullName,
              }}
              label={
                dictionary.pages.home.subscribe_section.sub_form.full_name.label
              }
              placeholder="John doe"
              inputType="text"
            />
            <Input<string>
              _controller={{
                initialValue: email,
                value: email,
                setValue: setEmail,
              }}
              label={
                dictionary.pages.home.subscribe_section.sub_form.email.label
              }
              placeholder="Email address"
              inputType="email"
            />
            <Button
              className="bg-brand-darkblue text-white md:w-fit msm:w-full text-sm "
              onClick={handleSubscribe}
              loading={loading}
            >
              {dictionary.pages.home.subscribe_section.sub_form.cta}
            </Button>
          </div>
        </div>
      )}
    </WebSection>
  )
}
