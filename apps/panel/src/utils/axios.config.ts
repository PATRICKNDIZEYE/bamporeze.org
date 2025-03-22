import _ from "axios";


export const axios = _.create({
    baseURL: process.env['NEXT_PUBLIC_API_BASEURL'],
    headers: {
        'Content-Type': 'application/json',
    }

})
axios.interceptors.response.use(function (response) {
    if (response.status == 401) {

    }
    return response.data
})

export async function fetcher(url: string) {
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    return res.data
}

