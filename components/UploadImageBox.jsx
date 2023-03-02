import React, { useState } from 'react';
import { Modal, Upload } from 'antd';

const UploadImageBox = ({ index, listProductVariant, setListProductVariant }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const getBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList }) => {
        let listProductVariantClone = [ ...listProductVariant ];
        listProductVariantClone[index].fileList = fileList;
        setListProductVariant(listProductVariantClone);
    };
    const uploadButton = (
        <div>
            <span>Thêm</span>
            <div style={{ marginTop: 8, }}>
                Upload
            </div>
        </div>
    );

    return (
        <div style={{ width: '660px' }}>
            <Upload
                listType="picture-card"
                fileList={listProductVariant[index].fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {listProductVariant[index].fileList.length >= 6 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%',}} src={previewImage}/>
            </Modal>
        </div>
    )
}

export default UploadImageBox
