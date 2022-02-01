import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

    public constructor(private router: Router) {}

    public canActivate(): boolean {
        const userType = sessionStorage.getItem("userType");
        if(userType == "CUSTOMER") {
            return true;
        } else if(userType == "ADMIN") {
            return true;
        }

        this.router.navigateByUrl("/login");
        return false;
    }

}