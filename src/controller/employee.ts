import { dadoEmployee } from '../interfaces/employee';
import * as Employee from '../model/employee';
import { ErrorMethod } from './errorMethod';

export const setEmployee = (req, res) => {
    try {
        let dadoEmployee: dadoEmployee = req.body;
        dadoEmployee.empresa = req.session.businessId;
        const employee = new Employee.EmployeeAlter();
        employee.setEmployee(dadoEmployee)
        .then(returnSentEmployee => {
            res.json(returnSentEmployee);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/employee. ' + error.message, req, res);
    }
}

export const upEmployee = (req, res) => {
    try {
        let dadoEmployee: dadoEmployee = req.body;
        dadoEmployee.empresa = req.session.businessId;
        const employee = new Employee.EmployeeAlter();
        employee.upEmployee(dadoEmployee)
        .then(returnUpdatedEmployee => {
            res.json(returnUpdatedEmployee);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/employee. ' + error.message, req, res);
    }
}

export const delEmployee = (req, res) => {
    try {
        let dadoEmployee: dadoEmployee = {
            empresa: req.session.businessId,
            id_funcionario: Number(req.params.employeeId)
        };
        const employee = new Employee.EmployeeAlter();
        employee.delEmployee(dadoEmployee)
        .then(returnDeletedEmployee => {
            res.json(returnDeletedEmployee);
        })
        .catch((error) => {
            res.status(500).json(error);
        })   
    } catch (error) {
        ErrorMethod('API/business/employee. ' + error.message, req, res);
    }
}

export const listEmployee = (req, res) => {
    const employee = new Employee.EmployeeView();
    employee.listEmployee(req.session.businessId)
    .then(returnListEmployee => {
        res.json(returnListEmployee);
    })
    .catch((error) => {
        res.status(500).json(error);
    })
}