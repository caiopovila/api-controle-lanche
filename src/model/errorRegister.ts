import { executeCommand } from '../connect/create';
import { dadoErrorRegister } from '../interfaces/errorRegister';

export const setError = (dadoError: dadoErrorRegister) => {
        try {
            const param = [
                'Erro: ' + dadoError.registro, 
                dadoError.id_empresa || null
            ];
            executeCommand('CALL cadastrar_registro(?, ?)', param)
            .then(sentError => {
                if (sentError.affectedRows > 0)
                    console.log('Error registred');
                else
                if (sentError[0][0]['E'])
                    console.error(sentError[0][0]);
            });
        } catch (error) {
            console.error('Register error. ' + error.message);
        }
}