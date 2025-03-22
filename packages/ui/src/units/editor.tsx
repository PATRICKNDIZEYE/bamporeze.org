'use client'

import { FC, HTMLAttributes } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../quill.styles.css";

interface IEditorProps extends HTMLAttributes<HTMLInputElement>{
    value: string
    setValue: (value: string) => void;
}

export const Editor: FC<IEditorProps> = (
    { value, setValue }: IEditorProps
) => {
    return (

        <div className='quill-container'>
            <ReactQuill theme="snow" value={value} onChange={setValue} placeholder='Type here' />
        </div>
    )
}

export default Editor