'use client'
import { useState } from "react";

export default function TestPage() {
    const [value, setValue] = useState('')
    return (
        <div className="grid grid-cols-2 gap-4 p-28">
            {/* <Editor setValue={setValue} value={value} />
            <Preview value={value} />
            {JSON.stringify(value)} */}
        </div>
    )
}