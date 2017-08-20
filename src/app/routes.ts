import { RouterModule, Routes } from '@angular/router';

const MAIN_ROUTES: Routes = [
    {
        path: 'test',
        loadChildren: './modules/test/test.module#TestModule'
    }
];

const otherwise = RouterModule.forRoot( [
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
]);

const mainRoutes = RouterModule.forRoot( MAIN_ROUTES );

export const routes = [
    mainRoutes
];