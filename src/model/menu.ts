import { executeCommand } from '../connect/create';
import { setError } from './errorRegister';
import { dadoMenu } from '../interfaces/menu';

export class Menu {

    getMenu = (dadoMenu : dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoMenu.id_cardapio, 
                    dadoMenu.empresa 
                ];
                const command = 'CALL pegar_cardapio(?, ?)';
                executeCommand(command, param)
                .then(bdMenu => {
                    if (bdMenu[0])
                        resolve(bdMenu);
                    else
                        reject({E: 'Erro - Não encontrado'});
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )
}

export class MenuAlter {

    setMenu = (dadoMenu: dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoMenu.nome, 
                    dadoMenu.descricao, 
                    dadoMenu.empresa
                ];
                const command = 'CALL cadastrar_cardapio(?, ?, ?)';
                executeCommand(command, param)
                .then(sentMenu => {
                    if (sentMenu[0][0].id_cardapio)
                        resolve(sentMenu[0][0]);
                    else
                    if (sentMenu[0][0]['E'])
                        reject(sentMenu[0][0]);
                });
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )

    upMenu = (dadoMenu: dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoMenu.id_cardapio, 
                    dadoMenu.nome, 
                    dadoMenu.descricao, 
                    dadoMenu.empresa 
                ];
                const command = 'CALL atualizar_cardapio(?, ?, ?, ?)';
                executeCommand(command, param)
                .then(updatedMenu => {
                    if (updatedMenu.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (updatedMenu[0][0]['E'])
                        reject(updatedMenu[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )

    delMenu = (dadoMenu: dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [
                    dadoMenu.id_cardapio, 
                    dadoMenu.empresa
                ];
                const command = 'CALL deletar_cardapio(?, ?)';
                executeCommand(command, param)
                .then(deletedMenu => {
                    if (deletedMenu.affectedRows > 0)
                        resolve({S: 'Ok'});
                    else
                    if (deletedMenu[0][0]['E'])
                        reject(deletedMenu[0][0]);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )
}

export class MenuView {

    listMenu = (businessId: number) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    businessId 
                ];
                const command = 'CALL lista_cardapio(?)';
                executeCommand(command, param)
                .then(listMenu => {
                    resolve(listMenu);
                });   
            } catch (error) {
                errorRegisterMethod(error, {empresa: businessId});
            }
        })
    )
}

export class MenuItem {

    listItemsMenu = (dadoMenu: dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoMenu.id_cardapio,
                    dadoMenu.empresa
                ];
                const command = 'CALL lista_item_cardapio(?, ?)';
                executeCommand(command, param)
                .then(itemsMenu => {
                    resolve(itemsMenu);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )

    listItemsNotMenu = (dadoMenu: dadoMenu) => (
        new Promise((resolve, reject) => {
            try {
                const param = [ 
                    dadoMenu.id_cardapio,
                    dadoMenu.empresa
                ];
                const command = `CALL lista_itens_fora_cardapio(?, ?)`;
                executeCommand(command, param)
                .then(listItemsNotMenu => {
                    resolve(listItemsNotMenu);
                });   
            } catch (error) {
                errorRegisterMethod(error, dadoMenu);
            }
        })
    )
}

const errorRegisterMethod = (error: any, dadoMenu: dadoMenu) => {
    const dadoError = {
        registro: 'Menu error. ' + error.message,
        id_empresa: dadoMenu.empresa
    };
    setError(dadoError);
}