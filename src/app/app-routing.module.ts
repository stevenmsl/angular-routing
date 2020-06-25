import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  // don’t need to add a forward slash in front of users
  // http://localhost:4200/users
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: ":id/:name", component: UserComponent },
    ],
  },
  {
    path: "servers",
    //canActivate: [AuthGuard],
    /* 
      only protects the chid routes so you can still 
      see a list of servers  
    */
    canActivateChild: [AuthGuard],
    component: ServersComponent,
    children: [
      {
        path: ":id",
        component: ServerComponent,
        /* 
          - the returned value will be stored
            in the “server” property
        */
        resolve: {
          server: ServerResolver,
        },
      },
      {
        path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // { path: "not-found", component: PageNotFoundComponent },
  /*
    - use data to pass static data to a route
  */
  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" },
  },
  /*
  /*
    - all other cases;catch-all 
    - order is important – need to be the last entry in all your routes 
  */
  { path: "**", redirectTo: "/not-found" },
];

@NgModule({
  /*
    - location strategies
    - http://localhost:4200/#/servers
    - tell web server to ignore everything after the hashtag 
      symbol so it won’t generate 404 error
    - everything after the hashtag will then be parsed by Angular  
  */
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
