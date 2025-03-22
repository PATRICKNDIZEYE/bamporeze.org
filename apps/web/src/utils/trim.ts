export default function trim(text: string){
    return text.length > 100 ? text.slice(0, 100) + '...' : text
}