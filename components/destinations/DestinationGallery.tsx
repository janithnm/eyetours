'use client';

import { Box, ImageList, ImageListItem, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function DestinationGallery({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <Box>
            <ImageList variant="masonry" cols={3} gap={16}>
                {images.map((img, index) => (
                    <ImageListItem key={index} sx={{ cursor: 'pointer', overflow: 'hidden', borderRadius: 2 }} onClick={() => setSelectedImage(img)}>
                        <img
                            src={`${img}?w=248&fit=crop&auto=format`}
                            srcSet={`${img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={`Gallery image ${index + 1}`}
                            loading="lazy"
                            style={{
                                borderRadius: 8,
                                transition: 'transform 0.3s ease',
                                display: 'block',
                                width: '100%'
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Modal
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
            >
                <Box sx={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
                    <IconButton
                        onClick={() => setSelectedImage(null)}
                        sx={{ position: 'absolute', top: -40, right: 0, color: 'white' }}
                    >
                        <X size={32} />
                    </IconButton>
                    <img
                        src={selectedImage || ''}
                        alt="Full view"
                        style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: 8, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
                    />
                </Box>
            </Modal>
        </Box>
    );
}
