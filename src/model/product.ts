import { executeCommand } from '../connect/create';
import { StockAlter } from './stock';
import { queryTreatment } from './querySearch';
import { setError } from './errorRegister';

import { dadoProduct } from '../interfaces/product';
import { dadoSearch } from '../interfaces/search';
import { dadoStock } from '../interfaces/stock';

export class ProductAlter extends StockAlter {

    setProduct = (dadoProduct: dadoProduct, dadoStock: dadoStock) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProduct.produto, 
                    dadoProduct.marca, 
                    dadoProduct.preco, 
                    dadoProduct.tipo || 1, 
                    dadoProduct.empresa
                ];
                const command = 'CALL cadastrar_produto(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentProduct => {
                    if (sentProduct[0][0].id_produto) {
                        dadoStock.id_produto = sentProduct[0][0].id_produto;
                        this.setStock(dadoStock)
                        .then(sentStock => {
                            resolve(sentStock);
                        })
                        .catch(error => {
                            reject(error);
                        })
                    } 

                    if (sentProduct[0][0]['E'])
                        reject(sentProduct[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProduct);
            }
        })
    )

    upProduct = (dadoProduct: dadoProduct, dadoStock: dadoStock) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProduct.id_produto, 
                    dadoProduct.produto, 
                    dadoProduct.marca, 
                    dadoProduct.preco, 
                    dadoProduct.empresa
                ];
                const command = 'CALL atualizar_produto(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedProduct => {
                    if (updatedProduct.affectedRows > 0) {
                        this.upStock(dadoStock)
                        .then(sentStock => {
                            resolve(sentStock);
                        })
                        .catch(error => {
                            reject(error);
                        })
                    }

                    if (updatedProduct[0][0]['E'])
                        reject(updatedProduct[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProduct);
            }
        })
    )

    delProduct = (dadoProduct: dadoProduct) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProduct.id_produto, 
                    dadoProduct.empresa
                ];
                const command = 'CALL deconstar_produto(?, ?)';
                executeCommand(command, param)
                .then(deletedProduct => {
                    if (deletedProduct.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedProduct[0][0]['E'])
                        reject(deletedProduct[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProduct);
            }
        })
    )
}

export class ProductView {

    listProduct = (dadoList: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoList.offset || 0, 
                    dadoList.row || 10, 
                    dadoList.businessId
                ];
                const command = 'CALL lista_produtos(?, ?, ?)';
                executeCommand(command, param)
                .then(bdProductList => {
                    resolve(bdProductList);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoList.businessId});
            }
        })
    )

    searchProduct = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_produto(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(bdProducts => {
                    resolve(bdProducts);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

export class ProductItem {

    listProductItem = (dadoProduct: dadoProduct) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProduct.id_produto,
                    dadoProduct.empresa
                ];
                const command = 'CALL lista_item_produto(?, ?)';
                executeCommand(command, param)
                .then(bdProductItem => {
                    resolve(bdProductItem);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProduct);
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoProduct: dadoProduct) => {
    const dadoError = {
        registro: 'Products error. ' + error.message,
        id_empresa: dadoProduct.empresa
    };
    setError(dadoError);
}