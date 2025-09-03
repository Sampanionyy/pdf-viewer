import React, { useState, useRef, useCallback, useMemo } from 'react';
import { Upload, FileText, X, Download, Eye } from 'lucide-react';
import FileArea from '../components/FileArea';
import UploadedFilesList from '../components/UploadedFilesList';
import Statistics from '../components/Statistics';
import ViewerPdf from '../components/ViewerPdf';
import useDragAndDrop from '../utils/drag-drop';
import useFileManagement from '../utils/file-management';
import useFileActions from '../utils/file-actions';

const PDFDragDrop = () => {
    const fileInputRef = useRef(null);
    
    const {
        uploadedFiles,
        currentPdf,
        addFiles,
        removeFile,
        openPdf,
        closePdf
    } = useFileManagement();
    
    const { downloadFile } = useFileActions();
    
    const {
        isDragging,
        dragHandlers
    } = useDragAndDrop(addFiles);

    // Gestionnaire d'input de fichier
    const handleFileInput = useCallback((e) => {
        const files = Array.from(e.target.files);
        addFiles(files);
    }, [addFiles]);

    // Propriétés calculées
    const fileAreaProps = useMemo(() => ({
        ...dragHandlers,
        handleFileInput,
        isDragging,
        fileInputRef
    }), [dragHandlers, handleFileInput, isDragging]);

    const fileListProps = useMemo(() => ({
        uploadedFiles,
        openPdf,
        removeFile,
        downloadFile,
        currentPdf
    }), [uploadedFiles, openPdf, removeFile, downloadFile, currentPdf]);

    const viewerProps = useMemo(() => ({
        currentPdf,
        closePdf
    }), [currentPdf, closePdf]);

    const statsProps = useMemo(() => ({
        uploadedFiles,
        currentPdf
    }), [uploadedFiles, currentPdf]);

    const hasUploadedFiles = uploadedFiles.length > 0;

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className={`max-w-6xl mx-auto`}>
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        PDF Drag & Drop Viewer
                    </h1>
                    <p className="text-slate-600">
                        Glissez-déposez vos fichiers PDF ou cliquez pour les sélectionner
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <section className="lg:col-span-1 space-y-6">
                        <FileArea {...fileAreaProps} />
                        
                        {hasUploadedFiles && (
                            <UploadedFilesList {...fileListProps} />
                        )}
                    </section>

                    <section className="lg:col-span-2">
                        <ViewerPdf {...viewerProps} />
                    </section>
                </main>

                <Statistics {...statsProps} />
            </div>
        </div>
    );
};

export default PDFDragDrop;