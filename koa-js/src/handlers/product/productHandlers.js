const {allProducts: allProducts,
    addProduct: addProduct,
    product: product,
    updateProduct: updateProduct,
    removeProduct: removeProduct} = require("../../database/productRepository.js");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
    try {
        const products = allProducts();

        ctx.body = {
            products
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function saveProducts(ctx) {
    try {
        const postData = ctx.request.body;
        const message = addProduct(postData);

        ctx.body = {
            message: message
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function changeProduct(ctx) {
    try {
        const postData = ctx.request.body;
        const {id} = ctx.params;
        const message = updateProduct(id,postData);

        ctx.body = {
            message: message
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}
async function deleteProduct(ctx) {
    try {
        const {id} = ctx.params;
        console.log(id)
        const message = removeProduct(id);

        ctx.body = {
            message: message
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{data: {author: string, name: string, id: number}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
    try {
        const {id} = ctx.params;
        const getCurrentProduct = product(id);
        if (getCurrentProduct) {
            return ctx.body = {
                data: getCurrentProduct
            }
        }

        throw new Error('Book Not Found with that id!')
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getProducts,
    saveProducts,
    deleteProduct,
    changeProduct,
    getProduct
};