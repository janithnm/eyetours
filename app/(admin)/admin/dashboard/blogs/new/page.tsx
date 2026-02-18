import { Box } from '@mui/material';
import BlogForm from '@/components/admin/blogs/BlogForm';
import { getActiveBlogCategories } from '@/app/actions/blog-categories';

export default async function NewBlogPage() {
    const { data: categories } = await getActiveBlogCategories();

    return (
        <Box>
            <BlogForm categories={categories || []} />
        </Box>
    );
}
