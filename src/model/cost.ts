import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { dadoCost } from '../interfaces/cost';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class Cost {

    getCost = (dadoCost: dadoCost) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoCost.id_custo,
                    dadoCost.empresa
                ];
                const command = 'CALL pegar_custo_fixo(?, ?)';
                executeCommand(command, param)
                .then(bdCost => {
                    if (bdCost[0])
                        resolve(bdCost[0]);
                    else
                        reject({E: 'Erro - Não encontrado'});
                });
            }
            catch (error) {
                setErrorMethod(error, dadoCost);
            }
        })
    )
}

export class CostAlter {

    setCost = (dadoCost: dadoCost) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoCost.nome, 
                    dadoCost.valor, 
                    dadoCost.dia_vencimento, 
                    dadoCost.empresa 
                ];
                const command = 'CALL cadastrar_custo(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentCost => {
                    if (sentCost[0][0].id_custo)
                        resolve(sentCost[0][0]);
                    else
                    if (sentCost[0][0]['E'])
                        reject(sentCost[0][0]);
                });   
            } catch (error) {
                setErrorMethod(error, dadoCost);
            }
        })
    )

    upCost = (dadoCost: dadoCost) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoCost.id_custo, 
                    dadoCost.nome, 
                    dadoCost.valor, 
                    dadoCost.dia_vencimento, 
                    dadoCost.empresa 
                ];
                const command = 'CALL atualizar_custo(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedCost => {
                    if (updatedCost.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (updatedCost[0][0]['E'])
                        reject(updatedCost[0][0]);
                });      
            } catch (error) {
                setErrorMethod(error, dadoCost);
            }
        })
    )

    delCost = (dadoCost: dadoCost) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoCost.id_custo, 
                    dadoCost.empresa
                ];
                const command = 'CALL deletar_custo(?, ?)';
                executeCommand(command, param)
                .then(deletedCost => {
                    if (deletedCost.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (deletedCost[0][0]['E'])
                        reject(deletedCost[0][0]);
                });   
            } catch (error) {
                setErrorMethod(error, dadoCost);
            }
        })
    )
}

export class CostView {

    listCost = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ businessId ];
                const command = 'lista_custo_fixo(?)';
                executeCommand(command, param)
                .then(listCost => {
                    resolve(listCost);
                });   
            } catch (error) {
                setErrorMethod(error, {empresa: businessId});
            }
        })
    )
}

const setErrorMethod = (error: any, dadoCost: dadoCost) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Costs error. ' + error.message,
        id_empresa: dadoCost.empresa
    };
    setError(dadoError);
}