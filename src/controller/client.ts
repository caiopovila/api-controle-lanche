import * as Client from '../model/client';

import { dadoClient } from '../interfaces/client';
import { dadoAdress } from '../interfaces/adress';
import { dadoSearch } from '../interfaces/search';
import { ErrorMethod } from './errorMethod';

export const searchClient = (req, res) => {
    try {
        let dadoSearch: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row),
            query: req.params.q
        }
        const client = new Client.ViewClient();
        client.searchClient(dadoSearch)
        .then(returnListClient => {
            res.json(returnListClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/client/list. ' + error.message, req, res);
    }
}

export const listClient = (req, res) => {
    try {
        let dadoList: dadoSearch = {
            businessId: req.session.businessId,
            offset: Number(req.query.offset),
            row: Number(req.query.row)
        }
        const client = new Client.ViewClient();
        client.listClient(dadoList)
        .then(returnListClient => {
            res.json(returnListClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/client/list. ' + error.message, req, res);
    }
}

export const listAdressClient = (req, res) => {
    try {
        let dadoClient: dadoClient = {
            id_cliente: Number(req.params.clientId),
            empresa: req.session.businessId
        };
        const client = new Client.ClientAdress();
        client.listAdressClient(dadoClient)
        .then(returnListAdressClient => {
            res.json(returnListAdressClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/client/list. ' + error.message, req, res);
    }
}

export const upClient = (req, res) => {
    try {
        let dadoClient: dadoClient = req.body;
        dadoClient.empresa = req.session.businessId;
        const client = new Client.ClientAlter();
        client.upClient(dadoClient)
        .then(returnUpdatedClient => {
            res.json(returnUpdatedClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/client/dado. ' + error.message, req, res);
    }
}

export const delClient = (req, res) => {
    try {
        let dadoClient: dadoClient = {
            empresa: req.session.businessId,
            id_cliente: Number(req.params.clientId)
        };
        const client = new Client.ClientAlter();
        client.delClient(dadoClient)
        .then(returnDeletedClient => {
            res.json(returnDeletedClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/client/dado. ' + error.message, req, res);
    }
}

export const setClient = (req, res) => {
    try {
        let dadoClient: dadoClient = req.body;
        dadoClient.empresa = req.session.businessId;
        const client = new Client.ClientAlter();
        client.setClient(dadoClient)
        .then(returnSentClient => {
            res.json(returnSentClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/client/dado. ' + error.message, req, res);
    }
}

export const upAdressClient = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        const client = new Client.ClientAdress();
        client.upAdress(dadoAdress)
        .then(returnUpdatedAdressClient => {
            res.json(returnUpdatedAdressClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/client/adress. ' + error.message, req, res);
    }
};

export const setAdressClient = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        let dadoClient: dadoClient = {
            empresa: req.session.businessId,
            id_cliente: Number(req.params.clientId)
        };
        const client = new Client.ClientAdress();
        client.setAdressClient(dadoAdress, dadoClient)
        .then(returnSentAdressClient => {
            res.json(returnSentAdressClient);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/client/adress. ' + error.message, req, res);
    }
}

export const delAdressClient = (req, res) => {
    try {
        let dadoAdress: dadoAdress = {
            empresa: req.session.businessId,
            id_endereco: Number(req.params.adressId)
        };
        let dadoClient: dadoClient = {
            empresa: req.session.businessId,
            id_cliente: Number(req.params.clientId)
        };
        const client = new Client.ClientAdress();
        client.delAdressClient(dadoAdress, dadoClient)
        .then(returnDeletedAdress => {
            res.json(returnDeletedAdress);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    } catch (error) {
        ErrorMethod('API/client/adress. ' + error.message, req, res);
    }
}