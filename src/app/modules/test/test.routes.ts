import {Route, RouterModule} from '@angular/router';

import { TestComponent } from "./components/test.component"

const ROUTER_DATA: Route[] = [
    {
    path: '',
    component: TestComponent
    }
];

export const TestRoutes = RouterModule.forChild(ROUTER_DATA);
