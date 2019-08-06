import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserResolver implements Resolve<any> {
    constructor(private userservice : UserService){}
    
    resolve(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : {} {
        console.log('promise or observable',this.userservice.getUserSIngle())
       return this.userservice.getUserSIngle();
    }
}