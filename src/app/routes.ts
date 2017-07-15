import { RouterModule, Routes } from '@angular/router';

const MAIN_ROUTES: Routes = [];

const otherwise = RouterModule.forRoot( [
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
] )


const mainRoutes = RouterModule.forRoot( MAIN_ROUTES );

export const routes = [
    otherwise
];