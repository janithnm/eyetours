'use client';

import { useState } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton } from '@mui/material';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/app/actions/upload'; // We will create this

interface FileUploaderProps {
    value?: string;
    onUpload: (url: string) => void;
    folder?: string;
    label?: string;
}

export default function FileUploader({ value, onUpload, folder = 'uploads', label = 'Upload Image' }: FileUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | undefined>(value);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optimistic preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const res = await uploadImage(formData);

        if (res.success) {
            onUpload(res.url);
            // Keep preview as the new URL (or the object URL, visuals are same)
            setPreview(res.url);
        } else {
            alert('Upload failed: ' + res.error);
            setPreview(undefined); // Revert
        }
        setUploading(false);
    };

    const handleRemove = () => {
        onUpload('');
        setPreview(undefined);
    };

    return (
        <Box sx={{ border: '2px dashed', borderColor: 'divider', borderRadius: 2, p: 2, textAlign: 'center', position: 'relative' }}>
            {preview ? (
                <Box position="relative">
                    <img src={preview} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }} />
                    <IconButton
                        size="small"
                        onClick={handleRemove}
                        sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
                    >
                        <X size={16} />
                    </IconButton>
                </Box>
            ) : (
                <Box>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id={`file-upload-${label}`}
                        type="file"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                    <label htmlFor={`file-upload-${label}`}>
                        <Button
                            variant="outlined"
                            component="span"
                            startIcon={uploading ? <CircularProgress size={20} /> : <Upload size={20} />}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : label}
                        </Button>
                    </label>
                    <Typography variant="caption" display="block" color="text.secondary" mt={1}>
                        Supported: JPG, PNG, WEBP
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
