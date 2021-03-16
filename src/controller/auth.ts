import * as Business from '../model/business';
import { dadoBusiness } from '../interfaces/business';
import { ErrorMethod } from './errorMethod';

import * as crypto from 'crypto';

export const auth = (req, res) => {
    try {
      let authSent = '';
      
      if(req.get('Authorization'))
        authSent = req.get('Authorization');
      else 
        res.status(401).json({ E: 'Valores não informados.' });

      const dadoAuth = authSent.split(' ');

      const convertedAuth: dadoBusiness = convertBase64(dadoAuth[1]);

      const business = new Business.BusinessAuth();
      business.auth(convertedAuth)
      .then((bdBusiness: any) => {

        const hash = hashGenerator(bdBusiness);
        
        req.session.businessId = bdBusiness.id_empresa;
        req.session.hash = hash;

        res.json({id: hash});
      })
      .catch((error) => {
          res.status(401).json(error);
      });
  } catch (error) {
      ErrorMethod('API/business/auth. ' + error.message, req, res);
  }
};

const convertBase64 = (authBase64: string): dadoBusiness => {
  let conv = Buffer.from(authBase64, 'base64');
  let str = conv.toString('utf-8');
  let ar: string[] = str.split(':');
  let business: dadoBusiness = {
    email: ar[0],
    senha: ar[1]
  }
  return business;
}

const hashGenerator = (business: dadoBusiness): string => {
  const key = crypto.pbkdf2Sync(Date.now() % business.id_empresa + business.email, 'salt', 100000, 64, 'sha512');
  return key.toString('hex');
}
