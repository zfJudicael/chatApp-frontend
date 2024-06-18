import moment from "moment"

export default function useGetTimeFromIsoDate(isoDate: string | undefined){
    if(!isoDate) return ''
    return moment(isoDate).local().format('HH:mm')
}