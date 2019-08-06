import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  arrayAtservice: any[];
  userinput: User = {
    name: "",
    uname: "",
    email:"",
    phone:null,
    website:"",
    id: 100
  }
  userData: User;
  dataToUpdate = {
    updateName: "",
    updateUname: "",
    updateEmail: "",
    updatePhone:"",
    updateWebsite:"",
    id: null
  }
  SingleUser={};
  //  num:12;
  private url = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient,
              private router: Router) { 

  }

  getUsers() {
    return this.http.get(this.url)
  }

  store(details) {
    this.arrayAtservice = details;
    console.log('details', this.arrayAtservice)
  }

  hasData() {
    return this.arrayAtservice && this.arrayAtservice.length;
  }

  getData() {
    return this.arrayAtservice;
  }

  arrayForUserform(firstname: string, username: string,email: string,phone: number,website: string) {
    const user: User = {
      id: this.getNewId(),
      name: firstname,
      username: username,
      email:email,
      phone:phone,
      website:website
    }
    this.arrayAtservice.push(user);
  }

  updateUserData(userData) {
    this.dataToUpdate.updateName = userData.name;
    this.dataToUpdate.updateUname = userData.username;
    this.dataToUpdate.updateEmail = userData.email;
    this.dataToUpdate.updatePhone = userData.phone;
    this.dataToUpdate.id = userData.id;
    this.dataToUpdate.updateWebsite=userData.website;
  }
  compareUser(data) {
    console.log(data)
    const index = this.arrayAtservice.findIndex(obj => data.id == obj.id);
    this.arrayAtservice[index].name = data.name;
    this.arrayAtservice[index].username = data.uname;
    this.arrayAtservice[index].email = data.email;
    this.arrayAtservice[index].phone = data.phone;
    this.arrayAtservice[index].website=data.website 
    this.dataToUpdate = {
      updateName: "",
      updateUname: "",
      updateEmail:"",
      updatePhone:"",
      updateWebsite:"",
      id: null
    }
  }

  delete(data) {
    return this.http.delete(this.url + '/' + data)
  }
  getNewId() {
    return (this.arrayAtservice[this.arrayAtservice.length - 1].id) + 1;
  }

   getUserById(row) {
     this.http.get(this.url)
     .subscribe((userData)=>{
            this.SingleUser = userData[row.id-1]
            this.router.navigate(['/users',row.id])
     })
   }

   getUserSIngle(){
     return this.SingleUser;
   }
}






