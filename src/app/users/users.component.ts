import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data;
  constructor(private route: ActivatedRoute)
   { 
    this.route.queryParams.subscribe(param => {
      this.data = JSON.parse(param.data);
      console.log(this.data);
    })
  }

  ngOnInit() {
  }

}
