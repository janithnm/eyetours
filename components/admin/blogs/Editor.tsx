'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Editor({ value, onChange, placeholder }: EditorProps) {
    // Dynamically import ReactQuill to avoid SSR issues
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill-new'), { ssr: false }), []);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link', 'image'
    ];

    return (
        <div className="quill-editor-wrapper">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                style={{ height: '300px', marginBottom: '50px' }} // Add margin for toolbar/footer
            />
            <style jsx global>{`
                .quill-editor-wrapper .ql-container {
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    font-size: 1rem;
                    min-height: 200px;
                }
                .quill-editor-wrapper .ql-toolbar {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
            `}</style>
        </div>
    );
}




