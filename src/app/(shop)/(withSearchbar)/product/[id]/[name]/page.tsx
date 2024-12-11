import type { NextPage } from 'next';
import { redirect } from 'next/navigation';

import { getProductById } from '@/app/_api/products';

import { homeLink } from '@/constants/navigation';

export interface ProductPageProps {
    params: Promise<{
        id?: string;
    }>;
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
    const { id } = await params;

    if (!id) {
        redirect(homeLink);
    }

    const productResponse = await getProductById(id);

    if (!productResponse.success) {
        redirect(homeLink);
    }

    const product = productResponse.data;

    return (
        <div>
            ProductPage
            <pre>{JSON.stringify(product, null, 4)}</pre>
        </div>
    );
};

export default ProductPage;
