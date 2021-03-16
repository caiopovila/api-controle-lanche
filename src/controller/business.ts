import * as Business from '../model/business';

import { dadoBusiness } from '../interfaces/business';
import { dadoAdress } from '../interfaces/adress';
import { ErrorMethod } from './errorMethod';

export const getPrivilege = (req, res) => {
    try {
        const business = new Business.Business();
        business.getPrivilege(req.session.businessId)
        .then(privilegeBusiness => {
            res.json(privilegeBusiness);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
      ErrorMethod('API/business/privilege. ' + error.message, req, res);
    }
}

export const setBusiness = (req, res) => {
    try {
        let dadoBusiness: dadoBusiness = req.body;

        const business = new Business.BusinessAlter();
        business.setBusiness(dadoBusiness)
        .then(returnSentBusiness => {
            res.json(returnSentBusiness);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/dado. ' + error.message, req, res);
    }
}
  
export const upBusiness = (req, res) => {
    try {
        let dadoBusiness: dadoBusiness = req.body;
        dadoBusiness.id_empresa = req.session.businessId;
        const business = new Business.BusinessAlter();
        business.upBusiness(dadoBusiness)
        .then(returnUpdatedBusiness => {
            res.json(returnUpdatedBusiness);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/dado. ' + error.message, req, res);
    }
}

export const getDadoBusiness = (req, res) => {
    const business = new Business.Business();
    business.getBusiness(req.session.businessId)
    .then(returnDadoBusiness => {
        res.json(returnDadoBusiness);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}

export const upAdressBusiness = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        const business = new Business.BusinessAdress();
        business.upAdress(dadoAdress)
        .then(returnUpdatedAdressBusiness => {
            res.json(returnUpdatedAdressBusiness);
        })
        .catch(error => {
            res.status(500).json(error);
        });   
    } catch (error) {
        ErrorMethod('API/business/adress. ' + error.message, req, res);
    }
}

export const setAdressBusiness = (req, res) => {
    try {
        let dadoAdress: dadoAdress = req.body;
        dadoAdress.empresa = req.session.businessId;
        const business = new Business.BusinessAdress();
        business.setAdressBusiness(dadoAdress, dadoAdress.empresa)
        .then(returnSentAdressBusiness =>
            res.json(returnSentAdressBusiness)
        )
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        ErrorMethod('API/business/adress. ' + error.message, req, res);
    }
}

export const getAdressBusiness = (req, res) => {
    try {
        const business = new Business.BusinessAdress();
        business.listAdressBusiness(req.session.businessId)
        .then((returnSentAdressBusiness: dadoAdress) => {
            res.json(returnSentAdressBusiness)
        })
        .catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        ErrorMethod('API/business/adress. ' + error.message, req, res);
    }
}