import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import feathers from '@feathersjs/feathers';
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, 'config/');
import configuration from '@feathersjs/configuration';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import { Application } from './declarations';
import logger from './logger';
import middleware from './middleware';
import services from './services';
import appHooks from './app.hooks';
import channels from './channels';
import { Authentication } from '@alliax/feathers-server';
import mongoose from './mongoose';
// Don't remove this comment. It's needed to format import lines nicely.

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
app.use('/' + app.get('path'), express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
// app.configure(socketio(app.get('socket')));
app.configure(socketio(app.get('socket')));

app.configure(mongoose);
app.configure(Authentication);
app.configure(middleware);
app.configure(services);
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger } as any));

app.hooks(appHooks);

export default app;
