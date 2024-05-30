import { VStack } from '@chakra-ui/react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { useEffect, useState } from 'react';

function DisplayPDF({ fileURL }: { fileURL: string }) {
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setViewportHeight(window.innerHeight);
            setViewportWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isSmallScreen = viewportWidth <= 768;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <VStack height={isSmallScreen ? '40vh' : '82vh'} width="50%" overflow="auto">
                <Viewer fileUrl={fileURL} />
            </VStack>
        </Worker>
    );
}

export default DisplayPDF;
