'use client'

import { Button, Text } from "@repo/ui/units";
import { FC, useEffect, useState } from "react";

interface ITableProps {
    columns: string[];
    data: any[];
    addSearch?: boolean,
    addPagination?: boolean,
    pageSize?: number,
    addCheckbox?: boolean,
}
const CustomTable: FC<ITableProps> = (props: ITableProps) => {
    const [page, setPage] = useState(0)
    const [pagelength, setPageLength] = useState(props.pageSize ?? 8)
    const [paginatedData, setPaginatedData] = useState<any[][]>([[]])
    const [data, setData] = useState<any[]>(props.data ?? [])

    useEffect(() => {
        if (props.data && Array.isArray(props.data)) setData(props.data)
    }, [props.data])


    function paginate(array: any[], page_size: number) {
        const paginatedArray = [];
        if (array.length < page_size) return [[...array]] // [[1,2,3]]
        for (let i = 0; i < array.length; i += page_size) {
            paginatedArray.push(array.slice(i, i + page_size)); // [[1,2,3],[4,5,6]]
        }
        return paginatedArray;
    }

    useEffect(() => {
        setPaginatedData(paginate(data, pagelength))
    }, [pagelength, data])

    return (
        <table className='w-full'>
            <thead>
                <tr className="bg-brand-darkblue-5">
                    {props.columns.map((column, index) => (
                        <>
                            <th className="py-4 border-none px-3 text-left" key={index}>
                                <Text variant='label' className="text-brand-blackblue capitalize"> {column} </Text>
                            </th>
                        </>
                    ))}
                </tr>
            </thead>

            <tbody>

                {
                    paginatedData[page].map((data: any, i) => {
                        const keys = Object.keys(data);
                        return (
                            <tr>
                                {
                                    keys.map((key, index) => (
                                        <td className="text-brand-lightblack py-4 px-3" >
                                            <Text variant='paragraph' > {data[key] as any} </Text>
                                        </td>
                                    ))
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
            {paginatedData.length > 1 && <div>
                <Button variant={'tertiary'} onClick={() => setPage(page - 1)} className="bg-brand-lightblue  rounded-md p-2" disabled={page == 0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H6.75L12 18.25l-.66.75l-6.5-6.5l6.5-6.5l.66.75L6.75 12H19z" /></svg>
                </Button>
                <Button variant={'tertiary'} onClick={() => setPage(page + 1)} className="bg-brand-lightblue  rounded-md p-2" disabled={page == paginatedData.length - 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="m221.66 133.66l-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32" /></svg>
                </Button>
            </div>
            }
        </table >
    )

}

export default CustomTable