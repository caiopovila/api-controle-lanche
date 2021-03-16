import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { queryTreatment } from './querySearch';
import { dadoFreight } from '../interfaces/freight';
import { dadoSearch } from '../interfaces/search';

export class FreightAlter {

    setFreight = (dadoFreight: dadoFreight) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoFreight.bairro, 
                    dadoFreight.cidade, 
                    dadoFreight.preco, 
                    dadoFreight.empresa
                ];
                const command = 'CALL cadastrar_frete(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentFreight => {
                    if (sentFreight[0][0].id_frete)
                        resolve(sentFreight[0][0]);
                    else
                    if (sentFreight[0][0]['E'])
                        reject(sentFreight[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoFreight);
            }
        })
    )

    upFreight = (dadoFreight: dadoFreight) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoFreight.id_frete, 
                    dadoFreight.bairro, 
                    dadoFreight.cidade, 
                    dadoFreight.preco, 
                    dadoFreight.empresa
                ];
                const command = 'CALL atualizar_frete(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedFreight => {
                    if (updatedFreight.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (updatedFreight[0][0]['E'])
                        reject(updatedFreight[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoFreight);
            }
        })
    )

    delFreight = (dadoFreight: dadoFreight) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoFreight.id_frete, 
                    dadoFreight.empresa
                ];
                const command = 'CALL deletar_frete(?, ?)';
                executeCommand(command, param)
                .then(deletedFreight => {
                    if (deletedFreight.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedFreight[0][0]['E'])
                        reject(deletedFreight[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoFreight);
            }
        })
    )
}

export class FreightView {

    listFreight = (dadoList: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoList.offset || 0, 
                    dadoList.row || 10, 
                    dadoList.businessId 
                ];
                const command = 'CALL lista_fretes(?, ?, ?)';
                executeCommand(command, param)
                .then(listFreight => {
                    resolve(listFreight);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoList.businessId});
            }
        })
    )

    searchFreight = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_fretes(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(listFreight => {
                    resolve(listFreight);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoFreight: dadoFreight) => {
    const dadoError = {
        registro: 'Freight error. ' + error.message,
        id_empresa: dadoFreight.empresa
    };
    setError(dadoError);
}