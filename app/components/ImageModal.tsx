import { useEffect } from 'react';

interface ImageModalProps {
    image: string;
    title: string;
    onClose: () => void;
}

const ImageModal = ({ image, title, onClose }: ImageModalProps) => {
    useEffect(() => {
        // Close modal on escape key
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative max-h-[90vh] max-w-[90vw] rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 
                             text-white w-8 h-8 rounded-full flex items-center justify-center"
                >
                    ×
                </button>
                <img
                    src={image}
                    alt={title}
                    className="max-h-[90vh] max-w-[90vw] h-auto w-auto object-contain"
                />
            </div>
        </div>
    );
};

export default ImageModal;