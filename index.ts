import { config } from "dotenv";

import { ie } from './src/ie';

config();

ie.listen(process.env.PORT, () => {
  console.log(`Iniciado na porta ${process.env.PORT}!`);
});