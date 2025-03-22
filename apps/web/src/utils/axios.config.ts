import _ from "axios";
export const axios = _.create({
    baseURL: process.env['NEXT_PUBLIC_API_BASEURL'],
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': "Content-Type",
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Origin': process.env['NEXT_PUBLIC_SITE_URL']
    }
})

// Handle API response structure
axios.interceptors.response.use(function (response) {
    // If response has a data.data structure, return the nested data
    if (response.data && typeof response.data === 'object' && response.data.data !== undefined) {
        return response.data;
    }
    // Otherwise return the data object
    return response.data;
})
