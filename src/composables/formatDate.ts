import moment from "moment"
import 'moment/dist/locale/fr';
import 'moment/dist/locale/en-gb'

type LOCALE = 'fr' | 'en-gb'
type FORMAT =  'L' | 'LLLL'

export default function useFormatDate(date: string | undefined, format: FORMAT, locale: LOCALE = 'fr'){
    return moment(date).local().locale(locale).format(format)
}