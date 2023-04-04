import React from 'react'

import Header from '@/components/Header'
import ColourManagement from '@/components/CategoryManagementPage/ColourManagement'
import SizeManagement from '@/components/CategoryManagementPage/SizeManagement'
import CategoryManagement from '@/components/CategoryManagementPage/CategoryManagement'

const CatalogManagementPage = () => {

    return (
        <div className='catalog-management-page'>
            <Header title="Quản lý danh mục" />
            <div className="row">
                <div className="col-8">
                    <CategoryManagement />
                </div>
                <div className="col-4">
                    <div>
                        <ColourManagement />
                    </div>
                    <div>
                        <SizeManagement />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogManagementPage