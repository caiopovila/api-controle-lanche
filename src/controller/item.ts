import * as Item from '../model/item';

import { dadoSearch } from '../interfaces/search';
import { dadoItem } from '../interfaces/item';
import { ErrorMethod } from './errorMethod';

export const getItem = (req, res) => {
    try {
        let dadoItem: dadoItem = {
            id_item: Number(req.params.itemId),
            empresa: req.session.businessId
        };
        const item = new Item.Item();
        item.getItem(dadoItem)
        .then(returnItem => {
            res.json(returnItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/item/dado. ' + error.message, req, res);
    }
}

export const searchItem = (req, res) => {
    try {
        let dadoSearch: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            query: req.params.q
        };
        const item = new Item.ItemView();
        item.searchItem(dadoSearch)
        .then(returnListItem => {
            res.json(returnListItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/item/list. ' + error.message, req, res);
    }
}

export const listItem = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        };
        const item = new Item.ItemView();
        item.listItems(dadoList)
        .then(returnListItem => {
            res.json(returnListItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/item/list. ' + error.message, req, res);
    }
}

export const upItem = (req, res) => {
    try {
        let dadoItem: dadoItem = req.body;
        dadoItem.empresa = req.session.businessId;
        const item = new Item.ItemAlter();
        item.upItem(dadoItem)
        .then(returnUpdatedItem => {
            res.json(returnUpdatedItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/item/dado. ' + error.message, req, res);
    }
}

export const delItem = (req, res) => {
    try {
        let dadoItem: dadoItem = {
            empresa: req.session.businessId,
            id_item: Number(req.params.itemId)
        };
        const item = new Item.ItemAlter();
        item.delItem(dadoItem)
        .then(returnDeletedItem => {
            res.json(returnDeletedItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/item/dado. ' + error.message, req, res);
    }
}

export const setItem = (req, res) => {
    try {
        let dadoItem: dadoItem = req.body;
        dadoItem.empresa = req.session.businessId;
        const item = new Item.ItemAlter();
        item.setItem(dadoItem)
        .then(returnSentItem => {
            res.json(returnSentItem);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/item/dado. ' + error.message, req, res);
    }
}

export const delItemMenu = (req, res) => {
    try {
        let dadoItem: dadoItem = {
            empresa: req.session.businessId,
            id_item: Number(req.params.itemId)
        };
        const item = new Item.ItemMenu();
        item.delItemMenu(Number(req.params.menuId), dadoItem)
        .then(returnDeletedItemInMenu => {
            res.json(returnDeletedItemInMenu);  
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/item/menu. ' + error.message, req, res);
    }
}

export const setItemsMenu = (req, res) => {
    try {
        let dadoItems: dadoItem[] = req.body;
        const item = new Item.ItemMenu();
        dadoItems.forEach(ddItem => {
            item.setItemMenu(Number(req.params.menuId), ddItem)
            .catch(error => {
                res.status(500).json(error);
            })   
        });
        res.json({S: 'Ok'}); 
    } catch (error) {
        ErrorMethod('API/item/menu. ' + error.message, req, res);
    }
}

export const setProductItem = (req, res) => {
    try {
        let dadoItem: dadoItem = {
            empresa: req.session.businessId,
            id_item: Number(req.params.itemId)
        };
        let productsItem: any[] = req.body;
        const item = new Item.ItemProduct();
        productsItem.forEach(prod => {
            item.setProductItem(prod.id_produto, prod.quantidade, dadoItem)
            .catch(error => {
                res.status(500).json(error);
            }); 
        });
        res.json({S: 'Ok'});
    } catch (error) {
        ErrorMethod('API/item/products. ' + error.message, req, res);
    }
}

export const delProductItem = async (req, res) => {
    try {
        let dadoItem: dadoItem = {
            empresa: req.session.businessId,
            id_item: Number(req.params.itemId)
        };
        const item = new Item.ItemProduct();
        item.delProductItem(req.params.productId, dadoItem)
        .then(returnDeletedProductItem => {
            res.json(returnDeletedProductItem); 
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        ErrorMethod('API/item/products. ' + error.message, req, res);
    }
}