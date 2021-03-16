import * as Product from '../model/product';

import { dadoProduct } from '../interfaces/product';
import { dadoStock } from '../interfaces/stock';
import { dadoSearch } from '../interfaces/search';
import { ErrorMethod } from './errorMethod';

export const searchProduct = (req, res) => {
    try {
        let dadoSearch: dadoSearch = {
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            businessId: req.session.businessId,
            query: req.params.q
        };
        const product = new Product.ProductView();
        product.searchProduct(dadoSearch)
        .then(returnSearchProduct => {
            res.json(returnSearchProduct);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/stock/product. ' + error.message, req, res);
    }
}

export const listProduct = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            businessId: req.session.businessId
        };
        const product = new Product.ProductView();
        product.listProduct(dadoList)
        .then(returnListProducts => {
            res.json(returnListProducts);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/stock/product. ' + error.message, req, res);
    }
}

export const setProduct = (req, res) => {
    try {
        let dadoProduct: dadoProduct = req.body.product;
        dadoProduct.empresa = req.session.businessId;
        let dadoStock: dadoStock = req.body.stock;
        dadoStock.empresa = req.session.businessId;
        const product = new Product.ProductAlter();
        product.setProduct(dadoProduct, dadoStock)
        .then(returnSentProduct => {
            res.json(returnSentProduct);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/product. ' + error.message, req, res);
    }
}

export const upProduct = (req, res) => {
    try {
        let dadoProduct: dadoProduct = req.body.product;
        dadoProduct.empresa = req.session.businessId;
        let dadoStock: dadoStock = req.body.stock;
        dadoStock.empresa = req.session.businessId;
        const product = new Product.ProductAlter();
        product.upProduct(dadoProduct, dadoStock)
        .then(returnUpdatedProduct => {
            res.json(returnUpdatedProduct);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/product. ' + error.message, req, res);
    }
}

export const delProduct =  (req, res) => {
    try {
        let dadoProduct: dadoProduct = {
            empresa: req.session.businessId,
            id_produto: Number(req.params.productId)
        };
        const product = new Product.ProductAlter();
        product.delProduct(dadoProduct)
        .then(returnDeletedProduct => {
            res.json(returnDeletedProduct);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/product. ' + error.message, req, res);
    }
}

export const movStock =  (req, res) => {
    try {
        let dadoStock: dadoStock = {
            empresa: req.session.businessId,
            id_produto: Number(req.params.stockId)
        };
        const product = new Product.ProductAlter();
        product.movStock(dadoStock, req.body.entry, req.body.out)
        .then(returnStock => {
            res.json(returnStock);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/product/mov. ' + error.message, req, res);
    }
}