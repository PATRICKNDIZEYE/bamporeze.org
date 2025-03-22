import { atom } from "recoil";
import { INewsLetterSubscriber } from "../app/p/newsletter_subscribers/page";


export const newsletterSubsState = atom<INewsLetterSubscriber[]>({
    key: 'newsletter_subscribers',
    default: []
})

