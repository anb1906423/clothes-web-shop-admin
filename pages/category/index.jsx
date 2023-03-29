import React from 'react'
import Header from '@/components/Header'
import ColourManage from '@/components/CategoryManagement/Colour'
import SizeManage from '@/components/CategoryManagement/Size'
import Category from '@/components/CategoryManagement/Category'
import { homeAPI } from '@/config'

const index = () => {

    return (
        <div className='category-management'>
            <Header title="Quản lý danh mục" />
            <div className="row">
                <div className="col-8">
                    <Category />
                </div>
                <div className="col-4">
                    <div>
                        <ColourManage />
                    </div>
                    <div>
                        <SizeManage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index