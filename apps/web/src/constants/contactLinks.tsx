import { EmailIcon, LocationIcon, PhoneIcon, WhatsappIcon } from "@repo/ui/units";
import { Locale } from "../../i18n.config";
import { getDictionary } from "../utils/dictionary";


interface IContactInfo {
  icon: React.FC
  text: string
  href: string
}


export const contactLinks: IContactInfo[] = [
  {
    icon: PhoneIcon,
    text: '+250 788 512 998',
    href: 'tel:+250788512998'
  },
  {
    icon: WhatsappIcon,
    text: '+250 780 503 577',
    href: "https://wa.me/+250780503577"
  },
  {
    icon: LocationIcon,
    text: '39 KG 167 St, Kigali, Rwanda',
    href: 'https://maps.app.goo.gl/CAFDGrw8TEyGLnQQA'
  },
  {

    icon: EmailIcon,
    text: 'info@hcakigali.com',
    href: 'mailto:info@hcakigali.com'
  },
  

]

export interface INavLink {
  name: string
  href: string
  active: boolean
}


export const getNavlinks = (locale: Locale): INavLink[] => {
  const navLinks = getDictionary(locale).global_layout.navigation.links
  return [
    {
      name: navLinks.home,
      href: '/',
      active: true,
    },
    {
      name: navLinks.about,
      href: '/about',
      active: false,
    },
    {
      name: navLinks.services,
      href: '/services',
      active: false,
    },
    {
      name: navLinks.careers,
      href: '/admissions',
      active: false,
    },
    {
      name: navLinks.blog,
      href: '/blog',
      active: false,
    },
    
    {
      name: navLinks.contact,
      href: '/contact',
      active: false,
    },
  ]

}