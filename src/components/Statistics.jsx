import React from 'react'

const Statistics = ({uploadedFiles, currentPdf}) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">
                    {uploadedFiles.length}
                </div>
                <div className="text-sm text-slate-600">Fichiers uploadés</div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">
                    {uploadedFiles.reduce((acc, file) => acc + parseFloat(file.size), 0).toFixed(2)}
                </div>
                <div className="text-sm text-slate-600">MB au total</div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">
                    {currentPdf ? '1' : '0'}
                </div>
                <div className="text-sm text-slate-600">PDF ouvert</div>
            </div>
        </div>
    )
}

export default Statistics