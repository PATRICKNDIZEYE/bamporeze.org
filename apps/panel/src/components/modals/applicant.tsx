import { Preview, Text } from "@repo/ui/units";

export default function Applicant({ title, phone, email, cover_letter, resume }: { [key: string]: string }) {
    return (
        <div className="bg-white p-8 rounded-md w-[500px]  flex flex-col gap-6">
            <div className="flex flex-col gap-2">

                <Text variant={'heading3'}>{title}</Text>
                <div className="flex items-center gap-4">
                    <Text variant={'paragraph'}>{email}</Text>
                    <Text variant={'paragraph'}>{phone}</Text>
                </div>
            </div>
            <div className="p-3 border border-brand-darkblue-5 rounded-md">
                <Preview value={cover_letter} />
            </div>
            <a className="border border-brand-darkblue-10 p-2 rounded-md flex items-center justify-between text-brand-darkblue hover:bg-brand-darkblue-10" href={resume} download>
                <Text variant={'paragraph'}>Download resume</Text>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7116 20.7969C11.4509 20.7969 11.2752 20.8224 11.1846 20.8479V22.5167C11.2922 22.5422 11.4268 22.5493 11.6124 22.5493C12.291 22.5493 12.7089 22.2065 12.7089 21.627C12.7089 21.1085 12.3491 20.7969 11.7116 20.7969ZM16.6515 20.8139C16.3682 20.8139 16.184 20.8394 16.0749 20.8649V24.5624C16.184 24.5879 16.3597 24.5879 16.5183 24.5879C17.6757 24.5964 18.4294 23.9589 18.4294 22.6102C18.4379 21.4344 17.7508 20.8139 16.6515 20.8139Z" fill="#0B60B0" />
                    <path d="M19.8337 2.83301H8.50033C7.74888 2.83301 7.02821 3.13152 6.49686 3.66287C5.9655 4.19422 5.66699 4.91489 5.66699 5.66634V28.333C5.66699 29.0845 5.9655 29.8051 6.49686 30.3365C7.02821 30.8678 7.74888 31.1663 8.50033 31.1663H25.5003C26.2518 31.1663 26.9724 30.8678 27.5038 30.3365C28.0351 29.8051 28.3337 29.0845 28.3337 28.333V11.333L19.8337 2.83301ZM13.4558 22.9355C13.0181 23.3463 12.3721 23.5305 11.6198 23.5305C11.474 23.5321 11.3282 23.5236 11.1835 23.505V25.5252H9.91699V19.9492C10.4886 19.8639 11.0661 19.8251 11.6439 19.833C12.433 19.833 12.994 19.9832 13.3722 20.2849C13.7321 20.5711 13.9757 21.04 13.9757 21.5925C13.9743 22.1478 13.7902 22.6168 13.4558 22.9355ZM18.8491 24.8551C18.2541 25.3495 17.3488 25.5847 16.2424 25.5847C15.5794 25.5847 15.1105 25.5422 14.7917 25.4997V19.9506C15.3635 19.8671 15.9409 19.8278 16.5187 19.833C17.5911 19.833 18.2881 20.0257 18.8321 20.4365C19.42 20.8728 19.7883 21.5684 19.7883 22.5672C19.7883 23.6481 19.3931 24.3947 18.8491 24.8551ZM24.0837 20.9238H21.9133V22.2144H23.942V23.2543H21.9133V25.5266H20.6298V19.8755H24.0837V20.9238ZM19.8337 12.7497H18.417V5.66634L25.5003 12.7497H19.8337Z" fill="#0B60B0" />
                </svg>
            </a>
        </div>
    )
}