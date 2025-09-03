import React from 'react'
import PdfArea from './PdfArea'
import { FileText } from 'lucide-react'

const ViewerPdf = ({currentPdf, closePdf}) => {
    return (
        <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden h-[700px]">
                {currentPdf ? (
                    <PdfArea currentPdf={currentPdf} closePdf={closePdf} />
                ) : (
                    <div className="h-full flex items-center justify-center text-center p-8">
                        <div>
                            <FileText className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                            <h3 className="text-xl font-semibold text-slate-600 mb-2">
                                Aucun PDF sélectionné
                            </h3>
                            <p className="text-slate-500">
                                Uploadez un fichier PDF pour commencer la visualisation
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewerPdf