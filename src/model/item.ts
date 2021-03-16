import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { queryTreatment } from './querySearch';
import { dadoItem } from '../interfaces/item';
import { dadoSearch } from '../interfaces/search';

export class Item {

    getItem = (dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    dadoItem.empresa
                ];
                const command = 'CALL pegar_item(?, ?)';
                executeCommand(command, param)
                .then(bdItem => {
                    resolve(bdItem);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )
}

export class ItemAlter {
    
    setItem = (dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.nome, 
                    dadoItem.descricao,
                    dadoItem.preco, 
                    dadoItem.marca || null, 
                    dadoItem.tipo || 1,
                    dadoItem.empresa
                ];
                const command = 'CALL cadastrar_item(?, ?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentItem => {
                    if (sentItem[0][0].id_item)
                        resolve(sentItem[0][0]);
                    else
                    if (sentItem[0][0]['E'])
                        reject(sentItem[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )

    upItem = (dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    dadoItem.nome,
                    dadoItem.descricao, 
                    dadoItem.marca || null, 
                    dadoItem.preco, 
                    dadoItem.empresa
                ];
                const command = 'CALL atualizar_item(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedItem => {
                    if (updatedItem.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (updatedItem[0][0]['E'])
                        reject(updatedItem[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )

    delItem = (dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    dadoItem.empresa
                ];
                const command = 'CALL deletar_item(?, ?)';
                executeCommand(command, param)
                .then(deletedId => {
                    if (deletedId.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedId[0][0]['E'])
                        reject(deletedId[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )
}

export class ItemProduct {

    setProductItem = (productId: number, amount: number, dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    productId, 
                    dadoItem.id_item, 
                    amount, 
                    'Kg', 
                    dadoItem.empresa
                ];
                const command = 'CALL add_produto_item(?, ?, ?, ?, ?)';
                executeCommand(command, param)
                .then(sentProductItem => {
                    if (sentProductItem.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (sentProductItem[0][0]['E'])
                        reject(sentProductItem[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )

    delProductItem = (productId: number, dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    productId,
                    dadoItem.id_item, 
                    dadoItem.empresa
                ];
                const command = 'CALL remover_produto_item(?, ?, ?)';
                executeCommand(command, param)
                .then(deletedProductItem => {
                    if (deletedProductItem.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedProductItem[0][0]['E'])
                        reject(deletedProductItem[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )
}

export class ItemMenu {

    setItemMenu = (menuId: number, dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    menuId, 
                    dadoItem.empresa
                ];
                const command = 'CALL add_item_cardapio(?, ?, ?)';
                executeCommand(command, param)
                .then(sentItemMenu => {
                    if (sentItemMenu.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (sentItemMenu[0][0]['E'])
                        reject(sentItemMenu[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )

    delItemMenu = (menuId: number, dadoItem: dadoItem) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoItem.id_item, 
                    menuId, 
                    dadoItem.empresa
                ];
                const command = 'CALL remover_item_cardapio(?, ?, ?)';
                executeCommand(command, param)
                .then(deletedItemMenu => {
                    if (deletedItemMenu.affectedRows > 0)
                        resolve({ S: 'Ok' });
                    else
                    if (deletedItemMenu[0][0]['E'])
                        reject(deletedItemMenu[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoItem);
            }
        })
    )
}

export class ItemView {
    
    listItems = (dadoList: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoList.offset || 0, 
                    dadoList.row || 10, 
                    dadoList.businessId
                ];
                const command = 'CALL lista_itens(?, ?, ?)';
                executeCommand(command, param)
                .then(listItems => {
                    resolve(listItems);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoList.businessId});
            }
        })
    )

    searchItem = (dadoSearch: dadoSearch) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    queryTreatment(dadoSearch.query), 
                    dadoSearch.offset || 0,
                    dadoSearch.row || 10,
                    dadoSearch.businessId
                ];
                const command = 'CALL pesquisa_itens(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(listItems => {
                    resolve(listItems);
                });
            } catch (error) {
                errorRegisterMethod(error, {empresa: dadoSearch.businessId});
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoItem: dadoItem) => {
    const dadoError = {
        registro: 'Items error. ' + error.message,
        id_empresa: dadoItem.empresa
    };
    setError(dadoError);
}