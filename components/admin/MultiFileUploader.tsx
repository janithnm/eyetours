'use client';

import { useState } from 'react';
import { Box, Button, Typography, CircularProgress, IconButton, Grid } from '@mui/material';
import { Upload, X, Plus } from 'lucide-react';
import { uploadImage } from '@/app/actions/upload';

interface MultiFileUploaderProps {
    values: string[];
    onUpload: (urls: string[]) => void;
    folder?: string;
    label?: string;
    aspectRatio?: string;
}

export default function MultiFileUploader({ values = [], onUpload, folder = 'uploads', label = 'Upload Images', aspectRatio = '1/1' }: MultiFileUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        // Upload sequentially or parallel
        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('folder', folder);

            const res = await uploadImage(formData);
            if (res.success) {
                newUrls.push(res.url);
            }
        }

        onUpload([...values, ...newUrls]);
        setUploading(false);
    };

    const handleRemove = (index: number) => {
        const newValues = [...values];
        newValues.splice(index, 1);
        onUpload(newValues);
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {values.map((url, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                        <Box position="relative">
                            <img
                                src={url}
                                alt={`Uploaded ${index}`}
                                style={{ width: '100%', aspectRatio: aspectRatio, objectFit: 'cover', borderRadius: 8 }}
                            />
                            <IconButton
                                size="small"
                                onClick={() => handleRemove(index)}
                                sx={{ position: 'absolute', top: 5, right: 5, bgcolor: 'white', '&:hover': { bgcolor: 'grey.200' } }}
                            >
                                <X size={16} color="red" />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
                <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            aspectRatio: aspectRatio,
                        }}
                    >
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`multi-file-upload-${label}`}
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                        <label htmlFor={`multi-file-upload-${label}`} style={{ width: '100%', height: '100%' }}>
                            <Button
                                component="span"
                                variant="contained"
                                disabled={uploading}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: 'text.primary', // Dark/Black aesthetic
                                    color: 'background.paper',
                                    borderRadius: 3,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        bgcolor: 'text.secondary',
                                        boxShadow: 2
                                    }
                                }}
                            >
                                {uploading ? <CircularProgress size={24} color="inherit" /> : <Plus size={32} />}
                                <Typography variant="subtitle2" fontWeight="bold">
                                    {uploading ? 'Uploading...' : 'Add Images'}
                                </Typography>
                            </Button>
                        </label>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
