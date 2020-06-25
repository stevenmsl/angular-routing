import { Component, OnInit } from "@angular/core";

import { ServersService } from "../servers.service";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    /* 
       - different approach  
       - retrieve data prepared by the resolver  
    */
    this.route.data.subscribe((data: Data) => {
      this.server = data["server"];
    });

    //need to convert the id from string to number
    //or you won’t find the server using the service
    // const id = +this.route.snapshot.params["id"];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params["id"]);
    // });
  }

  onEdit() {
    /*
      set queryParamsHandling: "preserve" to 
      preserve allowEdit  
    */
    this.router.navigate(
      ["edit"],
      { relativeTo: this.route, queryParamsHandling: "preserve" },
    );
  }
}
