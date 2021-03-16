import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { dadoEmployee } from '../interfaces/employee';

export class Employee {

    getEmployee = (dadoEmployee: dadoEmployee) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoEmployee.id_funcionario,
                    dadoEmployee.empresa
                ];
                const command = 'CALL pegar_funcionario(?, ?)';
                executeCommand(command, param)
                .then(bdEmployee => {
                    if (bdEmployee[0])
                        resolve(bdEmployee[0]);
                    else
                        reject({E: 'Erro - Não encontrado'});
                });
            }
            catch (error) {
                errorRegisterMethod(error, dadoEmployee);
            }
        })
    )
}

export class EmployeeAlter {
    
    setEmployee = (dadoEmployee: dadoEmployee) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoEmployee.nome, 
                    dadoEmployee.funcao, 
                    dadoEmployee.salario, 
                    dadoEmployee.dia_pagamento, 
                    dadoEmployee.empresa 
                ];
                const command = 'CALL cadastrar_funcionario(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentEmployee => {
                    if (sentEmployee[0][0].id_funcionario)
                        resolve(sentEmployee[0][0]);
                    else
                    if (sentEmployee[0][0]['E'])
                        reject(sentEmployee[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoEmployee);
            }
        })
    )

    upEmployee = (dadoEmployee: dadoEmployee) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoEmployee.id_funcionario, 
                    dadoEmployee.nome, 
                    dadoEmployee.funcao, 
                    dadoEmployee.salario, 
                    dadoEmployee.dia_pagamento, 
                    dadoEmployee.empresa 
                ];
                const command = 'CALL atualizar_funcionario(?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentEmployee => {
                    if (sentEmployee.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (sentEmployee[0][0]['E'])
                        reject(sentEmployee[0][0]);
                });      
            } catch (error) {
                errorRegisterMethod(error, dadoEmployee);
            }
        })
    )

    delEmployee = (dadoEmployee: dadoEmployee) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoEmployee.id_funcionario, 
                    dadoEmployee.empresa
                ];
                const command = 'CALL deletar_funcionario(?, ?)';
                executeCommand(command, param)
                .then(deletedEmployee => {
                    if (deletedEmployee.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (deletedEmployee[0][0]['E'])
                        reject(deletedEmployee[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoEmployee);
            }
        })
    )
}

export class EmployeeView {

    listEmployee = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ businessId ];
                const command = 'CALL lista_funcionario(?)';
                executeCommand(command, param)
                .then(businessId => {
                    resolve(businessId);
                });   
            } catch (error) {
                errorRegisterMethod(error, {empresa: businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoEmployee: dadoEmployee) => {
    const dadoError = {
        registro: 'Employee error. ' + error.message,
        id_empresa: dadoEmployee.empresa
    };
    setError(dadoError);
}