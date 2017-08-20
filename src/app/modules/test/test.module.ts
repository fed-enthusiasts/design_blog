import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TestComponent} from "./components/test.component";
import {TestRoutes} from "./test.routes";

@NgModule({
    imports: [
        CommonModule,
        TestRoutes
    ],
    exports: [],
    providers: [],
    declarations: [TestComponent]
})

export class TestModule { }
