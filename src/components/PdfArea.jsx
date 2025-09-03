import { X } from 'lucide-react'
import React from 'react'

const PdfArea = ({currentPdf, closePdf}) => {
    return (
        <>
            <div className="px-4 py-3 bg-slate-800 text-white flex items-center justify-between">
                <h3 className="font-semibold truncate flex-1 mr-4">
                    📄 {currentPdf.name}
                </h3>
                <button
                    onClick={closePdf}
                    className="p-1 rounded-full hover:bg-slate-700 transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            <div className="h-full">
                <iframe
                    src={currentPdf.url}
                    className="w-full h-full border-0"
                    title={`PDF Viewer - ${currentPdf.name}`}
                />
            </div>
        </>
    )
}

export default PdfArea