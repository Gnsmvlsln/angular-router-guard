import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users: any[]
  userinputt = {
    ffname: "",
    uuname: "",
    id: null
  }
  // dataSource:any[];
  dataSource = new MatTableDataSource<Element>(this.users);
  constructor(private userservice: UserService,
              private router: Router,
              private changeDetectorRefs: ChangeDetectorRef) {
    // console.log('stuck',this.userservice.userData)
    // const userData={name:this.userservice.userinput.name,username:this.userservice.userinput.uname,id:this.userservice.userinput.id}
    // this.userservice.addUser(userData)
    // .subscribe(response=>{
    //   this.check(response)
    //   console.log('big resp',response)
    //   this.users.splice(0,0,response);
    // })
  }
  check(rp) {
    return rp.id = this.userservice.userinput.id;
  }
  ngOnInit() {
    if (this.userservice.hasData()) {
      let data = this.userservice.getData();
      this.displaydata(data)
    } else {
      this.userservice.getUsers()
        .subscribe(response => {
          this.displaydata(response)
        })
    }
  }
  displaydata(response) {
    this.users = response;
    this.userservice.store(this.users);
    this.users = this.userservice.arrayAtservice;
    this.dataSource = new MatTableDataSource<Element>(this.users);
    // this.dataSource=this.users;
  }
  onUpdate(userData) {
    this.userservice.updateUserData(userData)
  }

  onDelete(data,dataSource) {
    console.log('dlt',data)
    const something=this.userservice.delete(data.id)
      .subscribe(response => {
        const index = this.users.indexOf(data);
        this.dataSource.data.splice(index, 1)
        console.log(this.users)   
        this.dataSource = new MatTableDataSource<Element>(this.dataSource.data);    
        console.log('this.data',this.dataSource)
      })
  }

  gotopost(row){
    this.userservice.getUserById(row)
    console.log('gotopost',row.id)
    
    // this.router.navigateByUrl(`users?data=${JSON.stringify(row)}`)
  }
   displayedColumns: string[] = [ 'name', 'username', 'email','phone','website','button','deletebutton'];
   
   
}
