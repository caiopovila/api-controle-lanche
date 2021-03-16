import * as Sale from '../model/sale';

import { dadoItem } from '../interfaces/item';
import { dadoSearch } from '../interfaces/search';
import { dadoSale } from '../interfaces/sale';
import { ErrorMethod } from './errorMethod';

export const setSale = (req, res) => {
    try {
        let dadoSale: dadoSale = req.body;
        dadoSale.empresa = req.session.businessId;
        const sale = new Sale.SaleAlter();
        sale.setSale(dadoSale)
        .then(returnSentSale => {
            res.json(returnSentSale);
        })
        .catch((error) => {
            res.status(500).json(error);   
        })   
    } catch (error) {
        ErrorMethod('API/sale/dado. ' + error.message, req, res);
    }
}

export const upSale = (req, res) => {
    try {
        let dadoSale: dadoSale = req.body;
        dadoSale.empresa = req.session.businessId;
        const sale = new Sale.SaleAlter();
        sale.upSale(dadoSale)
        .then(returnUpdatedSale => {
            res.json(returnUpdatedSale);
        })
        .catch((error) => {
            res.status(500).json(error);   
        })   
    } catch (error) {
        ErrorMethod('API/sale/dado. ' + error.message, req, res);
    }
}

export const delSale = (req, res) => {
    try {
        let dadoSale: dadoSale = {
            empresa: req.session.businessId,
            id_venda: Number(req.params.saleId)
        };
        const sale = new Sale.SaleAlter();
        sale.delSale(dadoSale)
        .then(returnDeletedSale => {
            res.json(returnDeletedSale);
        })
        .catch((error) => {
            res.status(500).json(error);   
        })   
    } catch (error) {
        ErrorMethod('API/sale/dado. ' + error.message, req, res);
    }
}

export const setItemSale = (req, res) => {
    try {
        let dadoItems: dadoItem[] = req.body;
        let dadoSale: dadoSale = {
            empresa: req.session.businessId,
            id_venda: Number(req.params.saleId)
        };
        const sale = new Sale.SaleItem();
        dadoItems.forEach(item => {
            sale.setItemSale(item, dadoSale)
            .catch(error => {
                res.status(500).json(error);
            }); 
        });
        res.json({S: 'Ok'});
    } catch (error) {
        ErrorMethod('API/sale/items. ' + error.message, req, res);
    }
}

export const delItem = (req, res) => {
    try {
        let dadoSale: dadoSale = {
            id_venda: Number(req.params.saleId),
            empresa: req.session.businessId
        };
        const sale = new Sale.SaleItem();
        sale.delItemSale(Number(req.params.itemId), dadoSale)
        .then(returnDeletedItem => {
            res.json(returnDeletedItem);
        })
        .catch((error) => {
            res.status(500).json(error);  
        })
    } catch (error) {
        ErrorMethod('API/sale/items. ' + error.message, req, res);
    }
}

export const listSale = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        };
        const sale = new Sale.SaleView();
        sale.listSale(dadoList)
        .then(returnListSale => {
            res.json(returnListSale);
        })
        .catch((error) => {
            res.sendStatus(500).json(error);   
        })   
    } catch (error) {
        ErrorMethod('API/sale/list. ' + error.message, req, res);
    }
}

export const listItemsSale = (req, res) => {
    try {    
        let dadoSale: dadoSale = {
            empresa: req.session.businessId,
            id_venda: Number(req.params.saleId)
        };
        const sale = new Sale.SaleItem();
        sale.getItemsSale(dadoSale)
        .then(returnListItemsSale => {
            res.json(returnListItemsSale);
        })
        .catch((error) => {
            res.sendStatus(500).json(error);  
        })
    } catch (error) {
        ErrorMethod('API/sale/list. ' + error.message, req, res);
    }
}

export const listSalePending = (req, res) => {
    try {  
        let dadoList: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        };
        const sale = new Sale.SaleView();
        sale.listSalePending(dadoList)
        .then(returnListSalePending => {
            res.json(returnListSalePending);
        })
        .catch((error) => {
            res.sendStatus(500).json(error);  
        })
    } catch (error) {
        ErrorMethod('API/sale/list. ' + error.message, req, res);
    }
}