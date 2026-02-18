import axios from 'axios';

const STORAGE_ZONE_NAME = process.env.BUNNY_STORAGE_ZONE;
const ACCESS_KEY = process.env.BUNNY_STORAGE_API_KEY;
const CDN_URL = process.env.BUNNY_CDN_URL;
const REGION = ''; // Leave empty for Germany (Falcon), or 'ny', 'la', 'sg', 'syd' etc.

// Base URL handling for different regions if needed, defaults to main endpoint
const BASE_URL = REGION ? `https://${REGION}.storage.bunnycdn.com` : 'https://storage.bunnycdn.com';


export type UploadResult =
    | { success: true; url: string }
    | { success: false; error: string };

export async function uploadFile(file: File | Blob, fileName: string, folder: string = ''): Promise<UploadResult> {
    if (!STORAGE_ZONE_NAME || !ACCESS_KEY) {
        throw new Error('Bunny.net credentials not configured');
    }

    const cleanFolder = folder.startsWith('/') ? folder.slice(1) : folder;
    const cleanFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
    const path = cleanFolder ? `eyetours/${cleanFolder}/${cleanFileName}` : `eyetours/${cleanFileName}`;

    const url = `${BASE_URL}/${STORAGE_ZONE_NAME}/${path}`;

    try {
        const response = await axios.put(url, file, {
            headers: {
                AccessKey: ACCESS_KEY,
                'Content-Type': 'application/octet-stream', // content type is just octet-stream for raw upload usually, or file.type
            },
        });

        if (response.status === 201) {
            return {
                success: true,
                url: `${CDN_URL}/${path}`
            }
        } else {
            return { success: false, error: 'Upload failed with status ' + response.status };
        }

    } catch (error) {
        console.error('Bunny.net upload error:', error);
        return { success: false, error: 'Failed to upload image' };
    }
}

export async function deleteFile(fileName: string, folder: string = '') {
    if (!STORAGE_ZONE_NAME || !ACCESS_KEY) {
        throw new Error('Bunny.net credentials not configured');
    }

    const cleanFolder = folder.startsWith('/') ? folder.slice(1) : folder;
    const cleanFileName = fileName.startsWith('/') ? fileName.slice(1) : fileName;
    const path = cleanFolder ? `eyetours/${cleanFolder}/${cleanFileName}` : `eyetours/${cleanFileName}`;

    const url = `${BASE_URL}/${STORAGE_ZONE_NAME}/${path}`;

    try {
        const response = await axios.delete(url, {
            headers: {
                AccessKey: ACCESS_KEY,
            },
        });

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false, error: 'Delete failed with status ' + response.status };
        }

    } catch (error) {
        console.error('Bunny.net delete error:', error);
        return { success: false, error: 'Failed to delete image' };
    }
}
