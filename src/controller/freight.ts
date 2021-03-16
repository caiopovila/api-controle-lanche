import * as Freight from '../model/freight';

import { dadoSearch } from '../interfaces/search';
import { dadoFreight } from '../interfaces/freight';
import { ErrorMethod } from './errorMethod';

export const searchFreight = (req, res) => {
    try {
        let dadoSearch: dadoSearch = {
            businessId: req.session.businessId,
            query: req.params.q,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        }
        const freight = new Freight.FreightView();
        freight.searchFreight(dadoSearch)
        .then(returnListFreight => {
            res.json(returnListFreight);
        })
        .catch((error) => {
            res.json(error);
        })
    } catch (error) {
        ErrorMethod('API/freight/list. ' + error.message, req, res);
    }
}

export const listFreight = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        };
        const freight = new Freight.FreightView();
        freight.listFreight(dadoList)
        .then(returnListFreight => {
            res.json(returnListFreight);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/freight/list. ' + error.message, req, res);
    }
}

export const setFreight = (req, res) => {
    try {
        let dadoFreight: dadoFreight = req.body;
        dadoFreight.empresa = req.session.businessId; 
        const freight = new Freight.FreightAlter();
        freight.setFreight(dadoFreight)
        .then(returnSentFreight => {
            res.json(returnSentFreight);
        })
        .catch((error) => {
            res.json(error);
        })   
    } catch (error) {
        ErrorMethod('API/freight/dado. ' + error.message, req, res);
    }
}

export const upFreight = (req, res) => {
    try {
        let dadoFreight: dadoFreight = req.body;
        dadoFreight.empresa = req.session.businessId;
        const freight = new Freight.FreightAlter();
        freight.upFreight(dadoFreight)
        .then(returnUpdatedFreight => {
            res.json(returnUpdatedFreight);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/freight/dado. ' + error.message, req, res);
    }
}

export const delFreight = (req, res) => {
    try {
        let dadoFreight: dadoFreight = {
            id_frete: Number(req.params.freight),
            empresa: req.session.businessId
        };
        const freight = new Freight.FreightAlter();
        freight.delFreight(dadoFreight)
        .then(returnDeletedFreight => {
            res.json(returnDeletedFreight);
        })
        .catch((error) => {
            res.json(error);
        })   
    } catch (error) {
        ErrorMethod('API/freight/dado. ' + error.message, req, res);
    }
}