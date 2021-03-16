import { executeCommand } from '../connect/create';
import { queryTreatment } from './querySearch';
import { setError } from './errorRegister';

import { dadoAdress } from '../interfaces/adress';
import { dadoSearch } from '../interfaces/search';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class Adress {

    getAdress = (dadoAdress: dadoAdress) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoAdress.id_endereco, 
                    dadoAdress.empresa
                ];
                const command = 'CALL pegar_endereco(?, ?)';
                executeCommand(command, param)
                .then(bdAdress => {
                    resolve(bdAdress);
                });
            } catch (error) {
                setErrorMethod(error, dadoAdress);
            }
        })
    )
}

export class AdressAlter {

    delAdress = (dadoAdress: dadoAdress) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoAdress.id_endereco, 
                    dadoAdress.empresa 
                ];
                const command = 'CALL deletar_endereco(?, ?)';
                executeCommand(command, param)
                .then(deletedAdress => {
                    if (deletedAdress.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (deletedAdress[0][0]['E'])
                        reject(deletedAdress[0][0]);
                });
            } catch (error) {
                setErrorMethod(error, dadoAdress);
            }
        })
    )

    setAdress = (dadoAdress: dadoAdress) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoAdress.rua, 
                    dadoAdress.numero, 
                    dadoAdress.bairro, 
                    dadoAdress.cidade, 
                    dadoAdress.cep, 
                    dadoAdress.empresa 
                ];
                const command = 'CALL cadastrar_endereco(?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentAdress => {
                    if (sentAdress[0][0].id_endereco)
                        resolve(sentAdress[0][0]);
                    else
                    if (sentAdress[0][0]['E'])
                        reject(sentAdress[0][0]);
                });   
            } catch (error) {
                setErrorMethod(error, dadoAdress);
            }
        })
    )

    upAdress = (dadoAdress: dadoAdress) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoAdress.id_endereco, 
                    dadoAdress.rua, 
                    dadoAdress.numero, 
                    dadoAdress.bairro, 
                    dadoAdress.cidade, 
                    dadoAdress.cep, 
                    dadoAdress.empresa 
                ];
                const command = 'CALL atualizar_endereco(?, ?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedAdress => {
                    if (updatedAdress.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (updatedAdress[0][0]['E'])
                        reject(updatedAdress[0][0]);
                });   
            } catch (error) {
                setErrorMethod(error, dadoAdress);
            }
        })
    )

}

export class viewAdress {

    searchAdress = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_enderecos(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(listAdress => {
                    resolve(listAdress);
                });   
            } catch (error) {
                setErrorMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const setErrorMethod = (error: any, dadoAdress: dadoAdress) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Adress error. ' + error.message,
        id_empresa: dadoAdress.empresa
    };
    setError(dadoError);
}