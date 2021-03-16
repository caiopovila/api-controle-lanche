import { Router } from 'express';

export const index = Router();

index.get('/', (req, res) => {
    res.json({
        API: 'Controle de lanches',
        version: '1.0'
    });
});