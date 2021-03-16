import { dadoCost } from '../interfaces/cost';
import * as Cost from '../model/cost';
import { ErrorMethod } from './errorMethod';

export const setCost = (req, res) => {
    try {
        let dadoCost: dadoCost = req.body;
        dadoCost.empresa = req.session.businessId;
        const cost = new Cost.CostAlter();
        cost.setCost(dadoCost)
        .then(returnSentCost => {
            res.json(returnSentCost);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/cost. ' + error.message, req, res);
    }
}

export const upCost = (req, res) => {
    try {
        let dadoCost: dadoCost = req.body;
        dadoCost.empresa = req.session.businessId;
        const cost = new Cost.CostAlter();
        cost.upCost(dadoCost)
        .then(returnUpdatedCost => {
            res.json(returnUpdatedCost);
        })
        .catch ((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/business/cost. ' + error.message, req, res);
    }
}

export const delCost = (req, res) => {
    try {
        let dadoCost: dadoCost = {
            id_custo: Number(req.params.cost),
            empresa: req.session.businessId
        };
        const cost = new Cost.CostAlter();
        cost.delCost(dadoCost)
        .then(returnDeletedCost => {
            res.json(returnDeletedCost);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/cost. ' + error.message, req, res);
    }
}

export const listCost = (req, res) => {
    const cost = new Cost.CostView();
    cost.listCost(req.session.businessId)
    .then(returnListCost => {
        res.json(returnListCost);
    })
    .catch ((error) => {
        res.status(500).json(error);
    })   
}
