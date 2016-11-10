import {Component, Input, OnInit} from '@angular/core';

import {Logger} from '../common/service/log';
import {Router} from '@angular/router';

import {AppState} from '../app.service';
import {Connection} from '../+connections/connection.model';
import {ConnectionService} from '../+connections/connection.service';

@Component({
    moduleId: module.id,
    // The selector is what angular internally uses
    // for `document.querySelectorAll(selector)` in our index.html
    selector: 'dashboard',
    // We need to tell Angular's Dependency Injection which providers are in our app.
    providers: [
        ConnectionService
    ],
    styles: [ require('./dashboard.scss') ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit{
    // Set our default values
    localState = '';
    errorMessage: string;

    @Input() connections: Connection[];

    /**
     * Constructor.
     * @param router - Router
     * @param _connectionService - ConnectionService
     */
    constructor(private router: Router, private _connectionService: ConnectionService) {}
    
    ngOnInit() {
        console.log('Loaded `Dashboard` component');

        this.getConnections();
    }

    getConnections() {
        this._connectionService.getAll()
          .subscribe(
            connections => this.connections = connections,
            error => this.errorMessage = <any>error);
    }

    gotoDetail(connection: Connection, $event:any): void {
        if ($event.target.className.indexOf('dropdown-toggle') !== -1) {
            return;
        }
        console.log("Connection: ", connection);
        let link = ['/detail', connection.id];
        //this.onConnectionSelected.emit(connection); // For action when selecting
        this.router.navigate(link);
    }
}
