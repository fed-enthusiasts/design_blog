import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';

//import './../../styles/main.scss';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import 'rxjs/add/operator/map';

@Component( {
    selector: 'app',
    templateUrl: './app.component.html'
} )
export class AppComponent implements OnInit {
    public data: any = null;
    public posts: any = null;
    public JSON_URL: string = 'https://jsonplaceholder.typicode.com/posts';

    public greeting: string = 'Hi, from Angular!';

    constructor( @Inject( PLATFORM_ID ) private platformId: Object, public http: Http
        //public appViewContainer: ViewContainerRef
    ) { }

    public ngOnInit(): void {
        if ( isPlatformServer( this.platformId ) ) {
            console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HI, FROM SERVER!' );
        }
        if ( isPlatformBrowser( this.platformId ) ) {
            console.log( '>>>>>>>>>>>>>>>>>>>>>>>>>>>>> HI, FROM BROWSER!' );
        }

        this.http.get( this.JSON_URL ).map(( res: any ) => { console.log( res ); return res.json() } ).subscribe(( data: any ) => {
            console.log( data );
            this.posts = data;
        } )

    }
}