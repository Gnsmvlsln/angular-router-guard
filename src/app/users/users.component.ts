import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user : {id: number,name :string,username:string,email:string,website:string,phone:number}
  data;
  constructor(private route: ActivatedRoute,
              private userservice: UserService,
              private router: Router )
   { 
    // this.route.queryParams.subscribe(param => {
    //   this.data = JSON.parse(param.data);
    //   console.log(this.data);
    // })
  }
  ngOnInit() {
    this.route.data
      .subscribe(
        (data: Data) =>{
          this.user = data['user'];
          console.log('finaaallllll',this.user)
        }
      )
  }
}
