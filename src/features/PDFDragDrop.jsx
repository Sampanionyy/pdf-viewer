import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, Download, Eye } from 'lucide-react';
import FileArea from '../components/FileArea';
import UploadedFilesList from '../components/UploadedFilesList';
import Statistics from '../components/Statistics';
import ViewerPdf from '../components/ViewerPdf';

const PDFDragDrop = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentPdf, setCurrentPdf] = useState(null);
    const fileInputRef = useRef(null);

    // Gestion du drag & drop
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsDragging(false);
        }
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    }, []);

    const handleFileInput = useCallback((e) => {
        const files = Array.from(e.target.files);
        handleFiles(files);
    }, []);

    const handleFiles = useCallback((files) => {
        const pdfFiles = files.filter(file => file.type === 'application/pdf');

        if (pdfFiles.length === 0) {
            alert('Veuillez sélectionner uniquement des fichiers PDF');
            return;
        }

        pdfFiles.forEach(file => {
            const fileData = {
                id: Date.now() + Math.random(),
                file,
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2), // MB
                url: URL.createObjectURL(file)
            };

            setUploadedFiles(prev => [...prev, fileData]);

            // Ouvre automatiquement le premier PDF uploadé
            if (uploadedFiles.length === 0 && !currentPdf) {
                setTimeout(() => {
                    setCurrentPdf(fileData);
                }, 300);
            }
        });
    }, [uploadedFiles.length, currentPdf]);

    const openPdf = useCallback((fileData) => {
        setCurrentPdf(fileData);
    }, []);

    const closePdf = useCallback(() => {
        setCurrentPdf(null);
    }, []);

    const removeFile = useCallback((id) => {
        setUploadedFiles(prev => {
            const updated = prev.filter(file => file.id !== id);
            // Si le PDF ouvert est supprimé, fermer le viewer
            if (currentPdf && currentPdf.id === id) {
                setCurrentPdf(null);
            }
            return updated;
        });
    }, [currentPdf]);

    const downloadFile = useCallback((fileData) => {
        const link = document.createElement('a');
        link.href = fileData.url;
        link.download = fileData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-2">
                        PDF Drag & Drop Viewer
                    </h1>
                    <p className="text-slate-600">
                        Glissez-déposez vos fichiers PDF ou cliquez pour les sélectionner
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <FileArea
                            handleDragEnter={handleDragEnter}
                            handleDragLeave={handleDragLeave}
                            handleDragOver={handleDragOver}
                            handleDrop={handleDrop}
                            handleFileInput={handleFileInput}
                            isDragging={isDragging}
                            fileInputRef={fileInputRef}
                        />

                        {/* Liste des fichiers */}
                        {uploadedFiles.length > 0 && (
                            <UploadedFilesList
                                uploadedFiles={uploadedFiles}
                                openPdf={openPdf}
                                removeFile={removeFile}
                                downloadFile={downloadFile}
                                currentPdf={currentPdf}
                            />
                        )}
                    </div>

                    <ViewerPdf currentPdf={currentPdf} closePdf={closePdf}/>
                </div>

                <Statistics uploadedFiles={uploadedFiles} currentPdf={currentPdf} />
            </div>
        </div>
    );
};

export default PDFDragDrop;