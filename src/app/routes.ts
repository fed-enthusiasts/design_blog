import { RouterModule, Routes } from '@angular/router';

import {TestRoutes} from "./modules/test/test.routes";

const MAIN_ROUTES: Routes = [
    ...TestRoutes
];

const otherwise = RouterModule.forRoot( [
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
] )


const mainRoutes = RouterModule.forRoot( MAIN_ROUTES );

export const routes = [
    mainRoutes
];