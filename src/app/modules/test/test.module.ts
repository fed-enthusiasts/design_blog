import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import {TestComponent} from "./components/test.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [],
    providers: [],
    declarations: [TestComponent]
})
//export class TestModule { }
