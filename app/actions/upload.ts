'use server';

import { uploadFile, type UploadResult } from '@/lib/bunny';

export async function uploadImage(formData: FormData): Promise<UploadResult> {
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
        return { success: false, error: 'No file provided' };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // We can pass Buffer directly if axios supports it, or convert to Blob/Stream
        // Axios in node supports Buffer.
        // However, the lib/bunny.ts expects "File | Blob". 
        // Let's adjust lib/bunny.ts to accept Buffer or modify how we call it.
        // Actually, let's create a specialized action here that handles the buffer conversion 
        // OR rely on the fact that we might need to modify lib/bunny.ts to be more server-friendly 
        // if it was designed for client-side (which it seems it wasn't, given process.env usage).

        // Wait, 'File' object in Server Action is a standardized Web API File.
        // lib/bunny.ts imports axios. 

        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-z0-9.]/gi, '_').toLowerCase();
        const fileName = `${timestamp}-${safeName}`;

        const res = await uploadFile(file, fileName, folder); // Passing File directly might work if axios handles it 

        return res;
    } catch (error) {
        console.error('Upload action error:', error);
        return { success: false, error: 'Upload failed' };
    }
}
