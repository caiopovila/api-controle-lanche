import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { dadoStock } from '../interfaces/stock';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class StockAlter {

    setStock = (dadoStock: dadoStock) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoStock.quantidade || null, 
                    dadoStock.peso || null, 
                    dadoStock.unidade_medida || 'kg', 
                    dadoStock.id_fornecedor || null, 
                    dadoStock.empresa, 
                    dadoStock.id_produto || null
                ];
                const command = 'CALL cadastrar_estoque(?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(bdStock => {
                    if (bdStock[0][0].id_estoque)
                        resolve(bdStock[0][0]);
                    else
                    if (bdStock[0][0]['E'])
                        reject(bdStock[0][0]);
                });
            } catch (error) {
                setErrorRegisterMethod(error, dadoStock);
            }
        })
    )

    upStock = (dadoStock: dadoStock) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoStock.id_estoque, 
                    dadoStock.quantidade || null, 
                    dadoStock.peso || null, 
                    dadoStock.unidade_medida || 'kg', 
                    dadoStock.id_fornecedor || null, 
                    dadoStock.empresa, 
                    dadoStock.id_produto || null
                ];
                const command = 'CALL atualizar_estoque(?, ?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(bdStock => {
                    if (bdStock.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (bdStock[0][0]['E'])
                        reject(bdStock[0][0]);
                });
            } catch (error) {
                setErrorRegisterMethod(error, dadoStock);
            }
        })
    )

    movStock = (dadoStock: dadoStock, entry: number, out: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    entry || null, 
                    out || null,  
                    dadoStock.empresa,
                    dadoStock.id_estoque,
                ];
                const command = 'CALL movimetar_estoque(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(bdStock => {
                    if (bdStock[0][0]['E'])
                        reject(bdStock[0][0]);
                    else
                    if (bdStock[0][0].id_estoque)
                        resolve(bdStock[0][0]);
                });
            } catch (error) {
                setErrorRegisterMethod(error, dadoStock);
            }
        })
    )
}

const setErrorRegisterMethod = (error: any, dadoStock: dadoStock) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Stocks error. ' + error.message,
        id_empresa: dadoStock.empresa
    };
    setError(dadoError);
}