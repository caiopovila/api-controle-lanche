import * as express from 'express';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { config } from "dotenv";

import { api } from './route/APIconfig';

config();

export const ie = express();

ie.use(helmet());

ie.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

ie.use(session({
  name: 'API_lanche_controle_Session',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    //secure: Boolean(process.env.SECURE),
    httpOnly: Boolean(process.env.HTTP_ONLY),
    domain: process.env.DOMAIN,
    path: '/' 
  }
}));

ie.use(bodyParser.urlencoded({ extended: true }));
ie.use(express.json());

ie.use('/API', api);
