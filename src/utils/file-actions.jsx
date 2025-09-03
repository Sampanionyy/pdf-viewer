import { useCallback } from "react";

const useFileActions = () => {
    const downloadFile = useCallback((fileData) => {
        const link = document.createElement('a');
        link.href = fileData.url;
        link.download = fileData.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return { downloadFile };
};

export default useFileActions;