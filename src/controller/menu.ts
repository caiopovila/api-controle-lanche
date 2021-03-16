import * as Menu from '../model/menu';
import { dadoMenu } from '../interfaces/menu';
import { ErrorMethod } from './errorMethod';

export const listMenu = (req, res) => {
    const menu = new Menu.MenuView();
    menu.listMenu(req.session.businessId)
    .then(returnListMenu => {
        res.json(returnListMenu);
    })
    .catch((error) => {
        res.status(500).json(error);
    })   
};

export const listItemsMenu = (req, res) => {
    try {
        let dadoMenu: dadoMenu = {
            empresa: req.session.businessId,
            id_cardapio: Number(req.params.menuId)
        };
        const menu = new Menu.MenuItem();
        menu.listItemsMenu(dadoMenu)
        .then(returnListItemsMenu => {
            res.json(returnListItemsMenu);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/menu/list. ' + error.message, req, res);
    }
}

export const listItemsNotMenu = (req, res) => {
    try {
        let dadoMenu: dadoMenu = {
            empresa: req.session.businessId,
            id_cardapio: Number(req.params.menuId)
        };
        const menu = new Menu.MenuItem();
        menu.listItemsNotMenu(dadoMenu)
        .then(returnListItemsNotInMenu => {
            res.json(returnListItemsNotInMenu);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/menu/list. ' + error.message, req, res);
    }
}

export const upMenu = (req, res) => {
    try {
        let dadoMenu: dadoMenu = req.body;
        dadoMenu.empresa = req.session.businessId;
        const menu = new Menu.MenuAlter();
        menu.upMenu(dadoMenu)
        .then(returnUpdatedMenu => {
            res.json(returnUpdatedMenu);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/menu/dado. ' + error.message, req, res);
    }
}

export const delMenu = (req, res) => {
    try {
        let dadoMenu: dadoMenu = {
            empresa: req.session.businessId,
            id_cardapio: req.session.menuId
        };
        const menu = new Menu.MenuAlter();
        menu.delMenu(dadoMenu)
        .then(returnDeletedMenu => {
            res.json(returnDeletedMenu);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/menu/dado. ' + error.message, req, res);
    }
}

export const setMenu = (req, res) => {
    try {
        let dadoMenu: dadoMenu = req.body;
        dadoMenu.empresa = req.session.businessId;
        const menu = new Menu.MenuAlter();
        menu.setMenu(dadoMenu)
        .then(returnSentMenu => {
            res.json(returnSentMenu);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/menu/dado. ' + error.message, req, res);
    }
}