import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { queryTreatment } from './querySearch';
import { AdressAlter } from './adress';

import { dadoSearch } from '../interfaces/search';
import { dadoProvider } from '../interfaces/provider';
import { dadoAdress } from '../interfaces/adress';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class Provider {

    getProvider = (dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProvider.id_fornecedor, 
                    dadoProvider.empresa
                ];
                const command = 'CALL pegar_fornecedor(?, ?)';
                executeCommand(command, param)
                .then(provider => {
                    if (provider[0])
                        resolve(provider[0]);
                    else
                        reject({ E: 'Erro - Não encontrado' });
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProvider);
            }
        })
    )
}

export class ProviderAdress extends AdressAlter {

    listAdressProvider = (dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoProvider.id_fornecedor,
                    dadoProvider.empresa
                ];
                const command = 'CALL endereco_fornecedor(?, ?)';
                executeCommand(command, param)
                .then(listAdressBusiness => {
                    resolve(listAdressBusiness);
                });      
            } catch (error) {
                errorRegisterMethod(error, dadoProvider);
            }
        })
    )

    setAdressProvider = (dadoAdress: dadoAdress, providerId: number) => (
        new Promise((resolve, reject) => {
            try {
                this.setAdress(dadoAdress)
                .then((adressReturned: dadoAdress) => {
                    const param = [ adressReturned.id_endereco, providerId, dadoAdress.empresa ];
                    const command = 'CALL add_endereco_fornecedor(?, ?, ?)';
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
                errorRegisterMethod(error, { empresa: dadoAdress.empresa });
            }
        })
    )

    delAdressProvider = (dadoAdress: dadoAdress, dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
            this.listAdressProvider(dadoProvider)
            .then((listReturned: dadoAdress[]) => {
                const adr = listReturned.find(adress => adress.id_endereco === dadoAdress.id_endereco);
                this.delAdress(adr)
                .then(adressDeleted => {
                    resolve(adressDeleted);
                })
                .catch(error => {
                    reject(error);
                });
            })   
            } catch (error) {
                errorRegisterMethod(error, dadoAdress);
            }
        })
    )
}

export class ProviderAlter {
    
    setProvider = (dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProvider.nome, 
                    dadoProvider.fone, 
                    dadoProvider.email, 
                    dadoProvider.empresa
                ];
                const command = 'CALL cadastrar_fornecedor(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentProvider => {
                    if (sentProvider[0][0].id_fornecedor)
                        resolve(sentProvider[0][0]);
                    else
                    if (sentProvider[0][0]['E'])
                        reject(sentProvider[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProvider);
            }
        })
    )

    upProvider = (dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProvider.id_fornecedor, 
                    dadoProvider.nome, 
                    dadoProvider.fone, 
                    dadoProvider.email, 
                    dadoProvider.empresa
                ];
                const command = 'CALL atualizar_fornecedor(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedProvider => {
                    if (updatedProvider[0][0].id_fornecedor)
                        resolve(updatedProvider[0][0]);
                    else
                    if (updatedProvider[0][0]['E'])
                        reject(updatedProvider[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProvider);
            }
        })
    )

    delProvider = (dadoProvider: dadoProvider) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoProvider.id_fornecedor, 
                    dadoProvider.empresa
                ];
                const command = 'CALL deconstar_fornecedor(?, ?)';
                executeCommand(command, param)
                .then(deletedProvider => {
                    if (deletedProvider.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedProvider[0][0]['E'])
                        reject(deletedProvider[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoProvider);
            }
        })
    )
}

export class ProviderView {

    listProvider = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL lista_fornecedores(?, ?, ?)';
                executeCommand(command, param)
                .then(listProvider => {
                    resolve(listProvider);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )

    searchProvider = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_fornecedores(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(listProviders => {
                    resolve(listProviders);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoProvider: dadoProvider) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Providers error. ' + error.message,
        id_empresa: dadoProvider.empresa
    };
    setError(dadoError);
}