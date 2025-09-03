import { useCallback, useState } from "react";

const useDragAndDrop = (onFilesDropped) => {
    const [isDragging, setIsDragging] = useState(false);

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
        onFilesDropped(files);
    }, [onFilesDropped]);

    return {
        isDragging,
        dragHandlers: {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop
        }
    };
};

export default useDragAndDrop;