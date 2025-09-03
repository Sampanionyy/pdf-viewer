import { Download, Eye, FileText, X } from 'lucide-react';
import React from 'react'

const UploadedFilesList = ({uploadedFiles, currentPdf, openPdf, downloadFile, removeFile}) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-800 text-white">
                <h3 className="font-semibold">
                    Fichiers uploadés ({uploadedFiles.length})
                </h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
                {uploadedFiles.map((file) => (
                    <div
                        key={file.id}
                        className={`
                            px-4 py-3 border-b border-slate-100 last:border-b-0 
                            hover:bg-slate-50 transition-colors duration-200
                            ${currentPdf?.id === file.id ? 'bg-slate-100' : ''}
                        `}
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className="flex items-center space-x-3 cursor-pointer flex-1"
                                onClick={() => openPdf(file)}
                            >
                                <FileText className="h-5 w-5 text-red-500" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {file.size} MB
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openPdf(file);
                                    }}
                                    className="p-1 rounded-full hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors"
                                    title="Voir"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        downloadFile(file);
                                    }}
                                    className="p-1 rounded-full hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-colors"
                                    title="Télécharger"
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(file.id);
                                    }}
                                    className="p-1 rounded-full hover:bg-red-100 text-slate-600 hover:text-red-600 transition-colors"
                                    title="Supprimer"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UploadedFilesList