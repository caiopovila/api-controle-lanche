import { setError } from '../model/errorRegister';

export const ErrorMethod = (error: string, req, res) => {
    const dadoError = {
        registro: error,
        empresa: req.session.businessId
    };
    setError(dadoError);
    res.status(500).json({ E: 'Ops! Error.' });
}