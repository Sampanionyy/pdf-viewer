import { useCallback, useState } from "react";

const useFileManagement = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [currentPdf, setCurrentPdf] = useState(null);

    // Créer un objet fichier standardisé
    const createFileData = useCallback((file) => ({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2), // MB
        url: URL.createObjectURL(file) // URL temp
    }), []);

    // Validation des fichiers PDF
    const validateFiles = useCallback((files) => {
        const pdfFiles = files.filter(file => file.type === 'application/pdf');
        
        if (pdfFiles.length === 0) {
            alert('Veuillez sélectionner uniquement des fichiers PDF'); // a changer
            return [];
        }
        
        return pdfFiles;
    }, []);

    // Ajout de fichiers
    const addFiles = useCallback((files) => {
        const validFiles = validateFiles(files);
        if (validFiles.length === 0) return;

        const newFileData = validFiles.map(createFileData);
        
        setUploadedFiles(prev => {
            const updated = [...prev, ...newFileData];
            
            // Auto-ouverture du premier PDF si aucun n'est ouvert
            if (prev.length === 0 && !currentPdf && newFileData.length > 0) {
                setTimeout(() => {
                    setCurrentPdf(newFileData[0]);
                }, 300);
            }
            
            return updated;
        });
    }, [createFileData, validateFiles, currentPdf]);

    // Suppression d'un fichier
    const removeFile = useCallback((id) => {
        setUploadedFiles(prev => {
            const updated = prev.filter(file => file.id !== id);
            
            // Fermer le viewer si le PDF ouvert est supprimé
            if (currentPdf?.id === id) {
                setCurrentPdf(null);
            }
            
            return updated;
        });
    }, [currentPdf]);

    // Ouverture/fermeture du PDF
    const openPdf = useCallback((fileData) => {
        setCurrentPdf(fileData);
    }, []);

    const closePdf = useCallback(() => {
        setCurrentPdf(null);
    }, []);

    return {
        uploadedFiles,
        currentPdf,
        addFiles,
        removeFile,
        openPdf,
        closePdf
    };
};

export default useFileManagement;