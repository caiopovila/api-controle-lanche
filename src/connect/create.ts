import { createConnection } from 'mysql';
import { promisify } from 'util';

import { BdConfiguration } from './config';

export const executeCommand = async (command: string, parameter: any[]) => {
    try {
        var connectBD = createConnection(BdConfiguration);
        connectBD.connect();
        const query = promisify(connectBD.query).bind(connectBD);
        const rows = await query(command, parameter);
        return rows;
      } catch {
        console.error('Ops! Connection error.');
      } finally {
        connectBD.end();
      }
  }