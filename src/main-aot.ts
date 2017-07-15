import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import '../styles/main.scss';

import { AppModuleNgFactory } from './aot/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory( AppModuleNgFactory );
