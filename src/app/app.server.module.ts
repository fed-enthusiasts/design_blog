import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule( {
    imports: [
        BrowserModule.withServerTransition( {
            appId: 'app'
        } ),
        ServerModule,
        AppModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppServerModule { }
