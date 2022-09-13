import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AccountService} from "../service/account.service";

@Injectable()
export class LoginGuard implements CanActivate{
  constructor(private accoundService:AccountService, private router:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean {
      let logged = this.accoundService.isLoggedIn();
      if(logged){
        return true;
      }
      this.router.navigate(["login"]);
      return false;
    }
}
