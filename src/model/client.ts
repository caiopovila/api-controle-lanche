import { executeCommand } from '../connect/create';
import { AdressAlter } from './adress';
import { queryTreatment } from './querySearch';
import { setError } from './errorRegister';
import { dadoClient } from '../interfaces/client';
import { dadoSearch } from '../interfaces/search';
import { dadoAdress } from '../interfaces/adress';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class Client {

    getClient = (dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoClient.id_cliente, 
                    dadoClient.empresa
                ];
                const command = 'CALL pegar_cliente(?, ?)';
                executeCommand(command, param)
                .then(bdClient => {
                    if (bdClient[0])
                        resolve(bdClient[0]);
                    else
                        reject({E: 'Erro - Não encontrado'});
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoClient);
            }
        })
    )
}

export class ClientAdress extends AdressAlter {

    delAdressClient = (dadoAdress: dadoAdress, dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
            this.listAdressClient(dadoClient)
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
                errorRegisterMethod(error, dadoClient);
            }
        })
    )

    listAdressClient = (dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoClient.id_cliente, 
                    dadoClient.empresa
                ];
                const command = 'CALL pegar_enderecos_cliente(?, ?)';
                executeCommand(command, param)
                .then(listAdress => {
                    resolve(listAdress);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoClient);
            }
        })
    )

    setAdressClient = (dadoAdress: dadoAdress, dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                this.setAdress(dadoAdress)
                .then((AdressReturned: dadoAdress) => {
                    const param = [
                        AdressReturned.id_endereco, 
                        dadoClient.id_cliente, 
                        dadoClient.empresa
                    ];
                    const command = 'CALL add_endereco_cliente(?, ?, ?)';
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
                errorRegisterMethod(error, dadoClient);
            }
        })
    )
}

export class ClientAlter {

    setClient = (dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoClient.nome, 
                    dadoClient.fone, 
                    dadoClient.email, 
                    dadoClient.empresa
                ];
                const command = 'CALL cadastrar_cliente(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentClient => {
                    if (sentClient[0][0].id_cliente)
                        resolve(sentClient[0][0]);
                    else
                    if (sentClient[0][0]['E'])
                        reject(sentClient[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoClient);
            }
        })
    )

    upClient = (dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoClient.id_cliente, 
                    dadoClient.nome, 
                    dadoClient.fone, 
                    dadoClient.email, 
                    dadoClient.empresa
                ];
                const command = 'CALL atualizar_cliente(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedClient => {
                    if (updatedClient.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (updatedClient[0][0]['E'])
                        reject(updatedClient[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoClient);
            }
        })
    )

    delClient = (dadoClient: dadoClient) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoClient.id_cliente, 
                    dadoClient.empresa
                ];
                const command = 'CALL deletar_cliente(?, ?)';
                executeCommand(command, param)
                .then(deletedClient => {
                    if (deletedClient.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (deletedClient[0][0]['E'])
                        reject(deletedClient[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoClient);
            }
        })
    )
}

export class ViewClient {

    listClient = (dadoList: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoList.offset || 0, 
                    dadoList.row || 10, 
                    dadoList.businessId 
                ];
                const command = 'CALL lista_clientes(?, ?, ?)';
                executeCommand(command, param)
                .then(listClient => {
                    resolve(listClient);
                });   
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoList.businessId});
            }
        })
    )

    searchClient = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_clientes(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(listClient => {
                    resolve(listClient);
                });   
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoClient: dadoClient) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Client error. ' + error.message,
        id_empresa: dadoClient.empresa
    };
    setError(dadoError);
}