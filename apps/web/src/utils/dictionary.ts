import type { Locale } from '../../i18n.config'
import { en, fr } from '../dictionaries'

const dictionaries = {
    en,
    fr
}
export const getDictionary = (locale: Locale) => dictionaries[locale]

export type Dictionary = typeof en;

// Remove the standalone objects that are causing the syntax error
// These translations should be in their respective dictionary files only
