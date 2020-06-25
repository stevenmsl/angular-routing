import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
    // Angular won’t re-create this component if
    // you are already on this component – the
    // component won’t pick up any params changes
    // unless it subscribes to the params observable.
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  // good practice to unsubscribe
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
