const fs = require('fs');
const {data: products} = require('../database/products.json');

/**
 *
 * @returns {*}
 */
function allProducts() {
    return products;
}

/**
 *
 * @param newProduct
 * @returns {{message: string}}
 */
function addProduct(newProduct) {
    const updatedProducts = [...products, newProduct];

    fs.writeFileSync('./src/database/products.json', JSON.stringify({
        data: updatedProducts
    }));

    return {
        message: 'Thêm sản phẩm thành công'
    };
}
/**
 *
 * @param id
 * @returns {*}
 */
function product(id) {
    return products.find(p => p.id === parseInt(id));
}

/**
 *
 * @param id
 * @param updatedData
 * @returns {{message: string}}
 */

function updateProduct(id, updatedData) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return {
            message: 'Không tìm thấy sản phẩm để cập nhật'
        };
    }

    try {
        products[index] = {...products[index], ...updatedData};

        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: products
        }));

        return {
            message: 'Cập nhật sản phẩm thành công'
        };

    } catch (err) {
        return {
            message: 'Có lỗi xảy ra khi cập nhật sản phẩm'
        };
    }
}

/**
 *
 * @param id
 * @returns {{message: string}}
 */
function removeProduct(id) {
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex === -1) {
        return {
            message: 'Không tìm thấy sản phẩm để xóa'
        };
    }

    try {
        products.splice(productIndex, 1);

        fs.writeFileSync('./src/database/products.json', JSON.stringify({
            data: products
        }));

        return {
            message: 'Xóa sản phẩm thành công'
        };

    } catch (err) {
        return {
            message: 'Có lỗi xảy ra khi xóa sản phẩm'
        };
    }
}
module.exports = {
    allProducts,
    addProduct,
    product,
    updateProduct,
    removeProduct
};
