// main.server.ts
// Modified version of equivalent file in 
// https://github.com/robwormald/ng-universal-demo/

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
//import { AppServerModule } from './app/app.server.module';
import { AppServerModuleNgFactory } from './ssr/app/app.server.module.ngfactory';
import * as express from 'express';
//const express = require( 'express' );
//import { ngExpressEngine } from './express-engine';

import { ngExpressEngine } from '@nguniversal/express-engine';


enableProdMode();


const app = express();

/*app.engine( 'html', ngExpressEngine( {
    baseUrl: 'http://localhost:8000',
    bootstrap: [ AppServerModuleNgFactory ],
} ) );*/

// Set the engine
app.engine( 'html', ngExpressEngine( {
    bootstrap: AppServerModuleNgFactory // Give it a module to bootstrap
} ) );

app.set( 'view engine', 'html' );
app.set( 'views', 'src' )

app.use('/', express.static('dist', {index: false}));
app.use('/', express.static('dist/client', {index: false}));
app.use('/styles', express.static('dist/client/styles', {index: false}));
app.use('/styles/assets', express.static('dist/client/assets', {index: false}));


//app.use( express.static( '.' ) );

/**
 * Catch all routes and return the `index.html`
 */
app.get( '*', ( req, res ) => {
    res.render( '../dist/index', {
        req: req,
        res: res,
        bootstrap: AppServerModuleNgFactory
    } );
} );

app.listen( 8000, () => {
    console.log( 'listening...' );
} );