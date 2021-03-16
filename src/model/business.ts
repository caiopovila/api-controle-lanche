import { executeCommand } from '../connect/create';
import { AdressAlter } from './adress';
import { setError } from './errorRegister';
import { dadoBusiness } from '../interfaces/business';
import { dadoAdress } from '../interfaces/adress';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class Business {

    getBusiness = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ businessId ];
                const command = 'CALL pegar_empresa(?)';
                executeCommand(command, param)
                .then(bdBusiness => {
                    if (bdBusiness[0][0])
                        resolve({ 
                            business: bdBusiness[0][0],
                            adress: bdBusiness[0][1],
                            privilege: bdBusiness[0][2]
                        });
                    else
                        reject({E: 'Erro - Não encontrado'});
                });
            } catch (error) {
                errorRegisterMethod(error, { id_empresa: businessId });
            }
        })
    )

    getPrivilege = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ businessId ];
                const command = 'CALL pegar_privilegio(?)';
                executeCommand(command, param)
                .then(bdPrivilege => {
                    if (bdPrivilege[0])
                        resolve(bdPrivilege[0].privilegio);
                    else
                        reject({E: 'Erro - Não encontrado'});
                });
            } catch (error) {
                errorRegisterMethod(error, { id_empresa: businessId });
            }
        })
    )
};

export class BusinessAdress extends AdressAlter {

    listAdressBusiness = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ businessId ];
                const command = 'CALL pegar_endereco_empresa(?)';
                executeCommand(command, param)
                .then(listAdressBusiness => {
                    resolve(listAdressBusiness);
                });      
            } catch (error) {
                errorRegisterMethod(error, { id_empresa: businessId });
            }
        })
    )

    setAdressBusiness = (dadoAdress: dadoAdress, businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                this.setAdress(dadoAdress)
                .then((adressReturned: dadoAdress) => {
                    const param = [ adressReturned.id_endereco, businessId ];
                    const command = 'CALL add_endereco_empresa(?, ?)';
                    executeCommand(command, param)
                    .then(sentAdress => {
                        if (sentAdress.affectedRows > 0)
                            resolve({S: 'Ok'});
                        else
                        if (sentAdress[0][0]['E'])
                            reject(sentAdress[0][0]);
                    });      
                })
                .catch(error => reject(error));
            } catch (error) {
                errorRegisterMethod(error, {id_empresa: businessId});
            }
        })
    )
}

export class BusinessAlter {

    setBusiness = (dadoBusiness: dadoBusiness) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoBusiness.nome, 
                    dadoBusiness.email, 
                    dadoBusiness.senha, 
                    dadoBusiness.fone 
                ];
                const command = 'CALL cadastrar_empresa(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentBusiness => {
                    if (sentBusiness[0][0].id_empresa)
                        resolve(sentBusiness[0][0]);
                    else
                    if (sentBusiness[0][0]['E'])
                        reject(sentBusiness[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, null);
            }
        })
    )

    upBusiness = (dadoBusiness: dadoBusiness) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoBusiness.nome, 
                    dadoBusiness.email, 
                    dadoBusiness.senha || '', 
                    dadoBusiness.fone, 
                    dadoBusiness.id_empresa 
                ];
                const command = 'CALL atualizar_empresa(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedBusiness => {
                    if (updatedBusiness[0][0].id_empresa)
                        resolve(updatedBusiness[0][0]);
                    else
                    if (updatedBusiness[0][0]['E'])
                        reject(updatedBusiness[0][0]);
                });      
            } catch (error) {
                errorRegisterMethod(error, dadoBusiness);
            }
        })
    );
}

export class BusinessAuth {

    auth = (dadoBusiness: dadoBusiness) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoBusiness.email,
                    dadoBusiness.senha 
                ];
                const command = 'CALL autentica_empresa(?, ?)';
                executeCommand(command, param)
                .then(authentication => {
                    if (authentication[0][0].id_empresa)
                        resolve(authentication[0][0]);
                    else
                    if (authentication[0][0]['E'])
                        reject(authentication[0][0]);
                });
            }
            catch (error) {
                errorRegisterMethod(error, null);
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoBusiness: dadoBusiness) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Business error. ' + error.message,
        id_empresa: dadoBusiness.id_empresa
    };
    setError(dadoError);
}