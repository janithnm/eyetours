import { getPostById } from '@/app/actions/posts';
import { getActiveBlogCategories } from '@/app/actions/blog-categories';
import BlogForm from '@/components/admin/blogs/BlogForm';
import { Box, Typography } from '@mui/material';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { success, data, error } = await getPostById(Number(id));
    const { data: categories } = await getActiveBlogCategories();

    if (!success || !data) {
        return (
            <Box p={3}>
                <Typography color="error" variant="h6">Error: {error || 'Post not found'}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <BlogForm initialData={data} categories={categories || []} />
        </Box>
    );
}
