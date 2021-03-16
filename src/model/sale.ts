import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { dadoItem } from '../interfaces/item';
import { dadoSearch } from '../interfaces/search';
import { dadoSale } from '../interfaces/sale';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export class SaleAlter {

    setSale = (dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoSale.endereco, 
                    dadoSale.frete, 
                    dadoSale.desconto, 
                    dadoSale.cliente, 
                    dadoSale.empresa
                ];
                const command = 'CALL cadastrar_venda(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentSale => {
                    if (sentSale[0][0].id_venda)
                        resolve(sentSale[0][0]);
                    else
                    if (sentSale[0][0]['E'])
                        reject(sentSale[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )

    upSale = (dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoSale.id_venda, 
                    dadoSale.endereco, 
                    dadoSale.desconto, 
                    dadoSale.progresso, 
                    dadoSale.frete, 
                    dadoSale.cliente, 
                    dadoSale.empresa
                ];
                const command = 'CALL atualizar_venda(?, ?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedSale => {
                    if (updatedSale.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (updatedSale[0][0]['E'])
                        reject(updatedSale[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )

    delSale = (dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoSale.id_venda, 
                    dadoSale.empresa
                ];
                const command = 'CALL deconstar_venda(?, ?)';
                executeCommand(command, param)
                .then(deletedSale => {
                    if (deletedSale.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else   
                    if (deletedSale[0][0]['E'])
                        reject(deletedSale[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )
}

export class SaleItem {

    setItemSale = (dadoItem: dadoItem, dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    dadoSale.id_venda, 
                    dadoItem.nome, 
                    dadoItem.preco, 
                    dadoSale.empresa
                ];
                const command = 'CALL add_item_venda(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentItemSale => {
                    if (sentItemSale.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (sentItemSale[0][0]['E'])
                        reject(sentItemSale[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )

    delItemSale = (idItem: number, dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    idItem,
                    dadoSale.id_venda,
                    dadoSale.empresa
                ];
                const command = 'CALL remover_item_venda(?, ?, ?)';
                executeCommand(command, param)
                .then(deletedItemSale => {
                    if (deletedItemSale.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedItemSale[0][0]['E'])
                        reject(deletedItemSale[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )

    getItemsSale = (dadoSale: dadoSale) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoSale.id_venda, 
                    dadoSale.empresa
                ];
                const command = 'CALL item_venda(?, ?)';
                executeCommand(command, param)
                .then(itemsSale => {
                    resolve(itemsSale);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoSale);
            }
        })
    )
}

export class SaleView {
    
    listSale = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoSearch.offset || 0, 
                    dadoSearch.row || 10, 
                    dadoSearch.businessId 
                ];
                const command = 'CALL lista_vendas(?,?,?)';
                executeCommand(command, param)
                .then(listSale => {
                    resolve(listSale);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )

    listSalePending = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoSearch.offset || 0, 
                    dadoSearch.row || 10,
                    dadoSearch.businessId 
                ];
                const command = 'CALL lista_vendas_aberto(?,?,?)';
                executeCommand(command, param)
                .then(listSalePending => {
                    resolve(listSalePending);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoSale: dadoSale) => {
    const dadoError: dadoErrorRegister = {
        registro: 'Sales error. ' + error.message,
        id_empresa: dadoSale.empresa
    };
    setError(dadoError);
}