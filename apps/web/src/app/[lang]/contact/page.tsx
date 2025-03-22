'use client'
import { Button, Input, Text } from "@repo/ui/units";
import _ from "axios";
import { useState } from "react";
import { Locale } from "../../../../i18n.config";
import WebSection from "../../../components/layouts/websection";
import { getDictionary } from "../../../utils/dictionary";
import axios from "axios";


export default function Contact({ params }: { params: { lang: Locale } }) {

    const dictionary = getDictionary(params.lang)

    const [loading, setLoading] = useState(false)
    const [name, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isSent, setIsSent] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
          setLoading(true)
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_REMOTE_BASEURL}/contact-us/new-message`, {
            name,
            email,
            message,
          })
          if (res.status === 201) {
            setFullName('')
            setEmail('')
            setMessage('')
            setIsSent(true)
          }
        } catch (error) {
        } finally {
          setLoading(false)
        }
      }
    return (
        <WebSection about="Contact us" className="py-10 ">
            <div className="rounded-md shadowed bg-white grid md:grid-cols-2 msm:grid-cols-1 gap-14 w-full">

                {!isSent ? <div className="flex flex-col gap-3 md:p-10 msm:p-4">
                    <div className="flex flex-col gap-2">
                        <Text variant="title_2" >
                            {dictionary.pages.contact_us.form.title}
                        </Text>
                        <Text >
                            {dictionary.pages.contact_us.form.description}
                        </Text>
                    </div>
                    <Input placeholder="John doe" label={dictionary.pages.contact_us.form.f_name.label} inputType="text" _controller={{
                        initialValue: name,
                        value: name,
                        setValue: setFullName,
                    }} />
                    <Input placeholder="johndoe@example.com" label={dictionary.pages.contact_us.form.email.label} inputType="email" _controller={{
                        initialValue: email,
                        value: email,
                        setValue: setEmail,
                    }} />
                    <Input placeholder={dictionary.pages.contact_us.form.message.placeholder} label={dictionary.pages.contact_us.form.message.label} inputType="textarea" _controller={{
                        initialValue: message,
                        value: message,
                        setValue: setMessage,
                    }}
                    />
                    <Button variant="primary" className="md:w-fit msm:w-full" loading={loading} onClick={handleSubmit}> {dictionary.pages.contact_us.form.cta}  </Button>

                </div> : <div className="flex items-center justify-center gap-3 p-10 min-h-[50vh]">
                    <div className="w-fit h-fit flex flex-col items-center gap-5 text-center">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-brand-darkblue">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                        </svg>

                        <Text variant="heading3" className="text-brand-darkblue">  {dictionary.pages.contact_us.form.on_success.title} </Text>
                        <Text variant="paragraph">
                            {dictionary.pages.contact_us.form.on_success.description}
                        </Text>
                        <Button variant="secondary" onClick={() => setIsSent(false)} className="w-fit" >
                            {dictionary.pages.contact_us.form.on_success.cta}
                        </Button>
                    </div>
                </div>}
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3987.5046697655525!2d30.124799999999993!3d-1.9513310000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwNTcnMDQuOCJTIDMwwrAwNycyOS4zIkU!5e0!3m2!1sen!2srw!4v1742507041619!5m2!1sen!2srw"  width="600" height="450" style={{
                    border: 0
                }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full rounded-xl overflow-hidden"></iframe>
            </div>

        </WebSection>
    )
}