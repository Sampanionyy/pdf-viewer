import { Upload } from 'lucide-react'
import React from 'react'

const FileArea = ({handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleFileInput, isDragging, fileInputRef}) => {
    return (
        <div
            className={`
                relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-300 ease-in-out transform
                ${isDragging
                    ? 'border-slate-400 bg-slate-100 scale-105 shadow-lg'
                    : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                className="hidden"
                onChange={handleFileInput}
            />

            <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
                <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragging ? 'text-slate-600' : 'text-slate-400'}`} />
                <p className="text-lg font-semibold text-slate-700 mb-2">
                    {isDragging ? 'Relâchez ici !' : 'Glissez vos PDF ici'}
                </p>
                <p className="text-sm text-slate-500">
                    ou cliquez pour parcourir vos fichiers
                </p>
            </div>

            {isDragging && (
                <div className="absolute inset-0 rounded-xl bg-slate-200 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 shadow-lg">
                        <Upload className="h-8 w-8 text-slate-600" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileArea