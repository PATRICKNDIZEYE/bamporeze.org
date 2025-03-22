'use client'
import { Button, Logo, Text } from '@repo/ui/units'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Select, { StylesConfig } from 'react-select'
import { Locale } from '../../../i18n.config'
import { contactLinks, getNavlinks } from '../../constants/contactLinks'
import { getDictionary } from '../../utils/dictionary'
import WebSection from '../layouts/websection'
import axios from 'axios'
import LocationIcon from '../icons/LocationIcon'
import EmailIcon from '../icons/EmailIcon'

const locales = [
  {
    label: <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#eee" d="M32 5H4a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4" /><path fill="#ce1124" d="M21 5h-6v10H0v6h15v10h6V21h15v-6H21z" /></svg><span className='text-brand-blackblue'>English</span>
    </div>,

    value: 'en'
  },
  {
    label: <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="#ed2939" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4z" /><path fill="#002495" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z" /><path fill="#eee" d="M12 5h12v26H12z" /></svg>
      <span className='text-brand-blackblue'>French</span>
    </div>,
    value: 'fr'
  },

]

const customStyles: StylesConfig = {
  control: (provided: any) => ({ // class attribute : class=" css-i32vvf-control"
    // ...provided,
    background: 'white',
    display: 'flex',
    flexWrap: 'nowrap',
    borderColor: 'transparent',
  }),
  menu: (provided: any) => ({ // 'menu' is from the div class too.
    ...provided,
    background: 'white',
    width: '100%'
  }),
};
export interface WithLocaleProp {
  locale: Locale
}

export default function Navbar(props: WithLocaleProp) {
  const pathname = usePathname()
  const router = useRouter()
  const [hidenav, setHideNav] = useState(false)
  const navLinks = getNavlinks(props.locale)
  const dictionary = getDictionary(props.locale)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position)
      axios.post(`${process.env.NEXT_PUBLIC_API_REMOTE_BASEURL}/visits/create`, {
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    })
  }, [])

  useEffect(() => {
    setHideNav(false)
  }, [pathname])

  function handleChangeLocale(locale: 'en' | 'fr') {
    let path = pathname.split('/')
    path.shift()
    path.shift()
    const newPath = `/${locale}/${path.join('/')}`
    router.push(newPath)
  }

  return (
    <div className='top-0 sticky w-full z-50'>
      <header id=''>
        <WebSection about="hcakigali  " className='md:flex msm:hidden msm:grid-cols-2 items-center justify-end gap-4 py-2 bg-brand-blackblue ' animate={false} >
          {contactLinks.map((contact, i) => (
            <Link href={contact.href} key={i} className='flex items-center gap-2 fill-white'>
              <contact.icon />
              <Text variant="paragraph" className='text-[12px] text-white/60'>
                {contact.text}
              </Text>
            </Link>))}
        </WebSection>
      </header>
      <nav className='top-0 md:block  sticky z-50  bg-white msm:hidden'>
        <WebSection about='hcakigali  .' className="flex flex-row justify-between items-center py-4 ui-bg-red-500 shadow-1 " animate={false}>
          <div className='w-28'>
            <Logo variant="light" />
          </div>
          <div className="flex items-center gap-6">
            {navLinks.map((link, index) => (
              <Link key={index} href={`/${props.locale + link.href}`}>
                <Text variant="paragraph" className="hover:text-brand-darkblue">
                  {link.name}
                </Text>
              </Link>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <Select
              styles={customStyles}
              classNames={{
                control: (state) =>
                  state.isFocused ? 'border-[#51697F]' : 'border-none',
              }}
              value={locales.find(locale => locale.value == props.locale) ?? locales[0]}
              onChange={(e) => handleChangeLocale((e as typeof locales[0]).value as 'en' | 'fr')}
              options={locales} />

            <Link href={'/contact'}>

              <Button>
                <Text variant="paragraph" className='text-white'>
                  {dictionary.global_layout.navigation.buttons.contact_us}
                </Text>
              </Button>
            </Link>
          </div>
        </WebSection>
      </nav>
      <nav className='top-0 msm:block bg-white sticky z-50  md:hidden'>
        <WebSection about='hcakigali  .' className="flex flex-col justify-between items-center py-4 ui-bg-red-500 shadow-1 " animate={false}>
          <div className='flex items-center justify-between  w-full'>
            <div className='w-28'>

              <Logo variant="light" />
            </div>
            <button onClick={() => setHideNav(!hidenav)}>
              <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 1.5H24" stroke="#51697F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M16.5 9H1.5" stroke="#51697F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M9 16.5H1.5" stroke="#51697F" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className={` ${hidenav ? 'absolute' : 'hidden'} flex flex-col items-center gap-6 absolute top-14 py-10 bg-white w-full`}>
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <Text variant="paragraph" className="hover:text-brand-darkblue">
                  {link.name}
                </Text>
              </Link>
            ))}
            <select 
                name="country" 
                id="" 
                className='p-4 rounded-sm outline-none appearance-none text-brand-lightblack font-lexend text-[14px]'
                defaultValue={props.locale}
            >
                <option value="en">
                    <Button className='flex items-center gap-2'>
                        <Text variant="paragraph">
                            EN
                        </Text>
                    </Button>
                </option>
                <option value="fr">
                    <Button className='flex items-center gap-2' >
                        <Text variant="paragraph">
                            FR
                        </Text>
                    </Button>
                </option>
            </select>
            <Button>
              <Text variant="paragraph" className='text-white md:w-fit msm:w-full'>
                Contact us
              </Text>
            </Button>
            <WebSection about="hcakigali  " className='md:flex msm:grid msm:grid-cols-2 items-center justify-end gap-4 py-2 ' animate={false} >
              {contactLinks.map((contact, i) => (
                <Link href={contact.href} key={i} className='flex items-center gap-2'>
                  <contact.icon />
                  <Text variant="paragraph" className='text-white'>
                    {contact.text}
                  </Text>
                </Link>))}
            </WebSection>
          </div>
        </WebSection>
      </nav>
    </div>
  )
}