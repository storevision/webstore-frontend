import type { FC, PropsWithChildren } from 'react';

import AddProductReviewModal from '@/components/modals/AddProductReviewModal';
import EditProductReviewModal from '@/components/modals/EditProductReviewModal';
import WelcomeModal from '@/components/modals/WelcomeModal';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <>
        {children}
        <WelcomeModal />
        <AddProductReviewModal />
        <EditProductReviewModal />
    </>
);

export default Layout;
