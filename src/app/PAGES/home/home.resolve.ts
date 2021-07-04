import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Platform } from "@ionic/angular";

@Injectable()
export class HomeResolver implements Resolve<any> {

    constructor(
        private platform: Platform,
        private router: Router
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        this.platform.ready()
        .then(res => {
            if (res) {
                console.log('Platform ready')
                return true
            }
        })
    }
}