import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { modules } from './modules';
import { routes } from './routes';
import { providers } from './providers';
import { entryComponents } from './entry';

@NgModule( {
  imports: [
    BrowserModule.withServerTransition( {
      appId: 'app'
    } ),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    ...routes,
    ...modules
  ],
  providers: [
    ...providers
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
    ...entryComponents
  ],
  bootstrap: [ AppComponent ]
} )

export class AppModule { }
