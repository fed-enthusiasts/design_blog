import { Route } from '@angular/router';

import { TestComponent } from "./components/test.component"

export const TestRoutes: Route[] = [
    {
        path: 'test',
        component: TestComponent
    }
];
