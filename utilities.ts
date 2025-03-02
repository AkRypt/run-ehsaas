export const convertGoogleDriveUrl = (url: string): string => {
    // Check if it's a Google Drive URL
    if (url.includes('drive.google.com')) {
        let fileId = "";
        
        if (url.includes("/file/d/")) {
            fileId = url.split("/file/d/")[1].split("/")[0];
        } else if (url.includes("?id=")) {
            fileId = url.split("?id=")[1].split("&")[0];
        } else if (url.includes("uc?id=")) {
            return url;
        }

        if (!fileId) {
            throw new Error("Invalid Google Drive URL");
        }

        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
    }
    
    // If not a Google Drive URL, return the original URL
    return url;
};

export const extractYouTubeId = (url: string): string => {
    try {
        const urlObj = new URL(url);
        let videoId = '';

        if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        }

        if (!videoId) throw new Error('Invalid YouTube URL');

        return videoId;
    } catch (error) {
        throw new Error('Invalid YouTube URL');
    }
};

export const convertYouTubeUrl = (url: string): string => {
    try {
        const urlObj = new URL(url);
        let videoId = '';

        if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        }

        if (!videoId) throw new Error('Invalid YouTube URL');

        return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
        throw new Error('Invalid YouTube URL');
    }
};