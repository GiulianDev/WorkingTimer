import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Platform } from "@ionic/angular";
import { Observable } from "rxjs";
import { IStatus } from "src/app/MODELS/INTERFACES/IStatus";
import { StorageService } from "src/app/SERVICE/Storage/storage.service";

@Injectable()
export class HomeResolve implements Resolve<IStatus | null> {

    constructor(
        private platform: Platform,
        private router: Router,
        private storageService: StorageService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any{        
        return this.platform.ready()
        .then(async res => {
            if (res) {
                console.log('Platform ready')
                let status = this.storageService.getStoredStatus();
                return status;
            }
        })
    }
}