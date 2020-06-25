import { Observable } from "rxjs";
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

/* 
  - Define an interface that can be implement by components 
    who require the canDeactivate guard. This is because the 
    component will have the knowledge of what to check 
    before leaving it.
  - created a class (guard) that implements 
    CanDeactivate interface (defined in router module) 
    so it can be used by Angular as a canDeactivate guard
  - inside the class (guard) call the method in the 
    interface you defined for components to implement  
*/

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate();
  }
}
