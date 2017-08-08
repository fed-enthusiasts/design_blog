import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'test',
    templateUrl: 'test.component.html'
})

export class TestComponent implements OnInit {

    public greeting: string = 'Hello from test component!';

    ngOnInit(): void {
        console.log('I am test component');
    }

}