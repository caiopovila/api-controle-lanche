const Verifier = require('email-verifier');

export const emailValidator = (req, res) => {
    let verifier = new Verifier("at_TXNdaNUCbem5N5dqv5DJUZHHGcx2r");
    verifier.verify(req.body.email, (err, data) => {
      if (err)
        res.status(500).json({ E: 'Email inválido.' });
      else
      if (
        data.formatCheck === 'true' &&
        data.disposableCheck === 'false' &&
        data.dnsCheck === 'true' &&
        data.smtpCheck !== 'false'
      )
        res.json({ S: 'Ok' });
      else
        res.status(500).json({ E: 'Email inválido.' });
    });
}
  