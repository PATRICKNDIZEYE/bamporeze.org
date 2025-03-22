export default function formatDate(date: string) {
    const d = new Date(date)
    return `${pad(d.getDay())} - ${pad(d.getMonth() + 1)} - ${pad(d.getFullYear())}`

}


export function pad(num: number) {
    return num < 10 && num > -1 ? `0${num}` : `${num}`

}