import * as Provider from '../model/provider';
import { ErrorMethod } from './errorMethod';

import { dadoProvider } from '../interfaces/provider';
import { dadoAdress } from '../interfaces/adress';
import { dadoSearch } from '../interfaces/search';

export const searchProvider = (req, res) => {
    try {
        let dadoSearch: dadoSearch = {
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            query: req.params.q,
            businessId: req.session.businessId
        };
        const provider = new Provider.ProviderView();
        provider.searchProvider(dadoSearch)
        .then(returnListProvider => {
            res.json(returnListProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider. ' + error.message, req, res);
    }
}

export const listProvider = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            businessId: req.session.businessId
        };
        const provider = new Provider.ProviderView();
        provider.listProvider(dadoList)
        .then(returnListProvider => {
            res.json(returnListProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/stock/provider. ' + error.message, req, res);
    }
}

export const setProvider = (req, res) => {
    try {
        let dadoProvider: dadoProvider = req.body;
        dadoProvider.empresa = req.session.businessId;
        const provider = new Provider.ProviderAlter();
        provider.setProvider(dadoProvider)
        .then(returnSentProvider => {
            res.json(returnSentProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider. ' + error.message, req, res);
    }
}

export const upProvider = (req, res) => {
    try {
        let dadoProvider: dadoProvider = req.body;
        dadoProvider.empresa = req.session.businessId;
        const provider = new Provider.ProviderAlter();
        provider.upProvider(dadoProvider)
        .then(returnSentProvider => {
            res.json(returnSentProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider. ' + error.message, req, res);
    }
}

export const delProvider = (req, res) => {
    try {
        let dadoProvider: dadoProvider = {
            empresa: req.session.businessId,
            id_fornecedor: Number(req.params.providerId)
        };
        const provider = new Provider.ProviderAlter();
        provider.delProvider(dadoProvider)
        .then(returnDeletedProvider => {
            res.json(returnDeletedProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/stock/provider. ' + error.message, req, res);
    }
}

export const upAdressProvider = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        const provider = new Provider.ProviderAdress();
        provider.upAdress(dadoAdress)
        .then(returnUpdatedAdressProvider => {
            res.json(returnUpdatedAdressProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider/adress. ' + error.message, req, res);
    }
};

export const setAdressProvider = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        const provider = new Provider.ProviderAdress();
        provider.setAdressProvider(dadoAdress, Number(req.params.providerId))
        .then(returnSentAdressProvider => {
            res.json(returnSentAdressProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider/adress. ' + error.message, req, res);
    }
}

export const listAdressProvider = (req, res) => {
    try {
        let dadoProvider: dadoProvider = {
            id_fornecedor: Number(req.params.providerId),
            empresa: req.session.businessId
        };
        const provider = new Provider.ProviderAdress();
        provider.listAdressProvider(dadoProvider)
        .then(returnListAdressProvider => {
            res.json(returnListAdressProvider);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/stock/provider/list. ' + error.message, req, res);
    }
}

export const delAdressProvider = (req, res) => {
    try {
        let dadoAdress: dadoAdress = {
            empresa: req.session.businessId,
            id_endereco: Number(req.params.adressId)
        };
        let dadoProvider: dadoProvider = {
            empresa: req.session.businessId,
            id_fornecedor: Number(req.params.providerId)
        };
        const provider = new Provider.ProviderAdress();
        provider.delAdressProvider(dadoAdress, dadoProvider)
        .then(returnDeletedAdress => {
            res.json(returnDeletedAdress);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/stock/provider/adress. ' + error.message, req, res);
    }
}