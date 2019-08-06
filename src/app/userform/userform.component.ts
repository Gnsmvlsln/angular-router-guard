import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit, CanComponentDeactivate {
  submitted= false;
  allowEdit = false;
  userForm : FormGroup;
  userInput={
    name:"",
    uname:"",
    email:"",
    phone:null,
    website:"",
    id:null
  }
  changesSaved = false;
  obj;

  constructor(private userservice: UserService,
              private router: Router)
               
  { }

  ngOnInit(){

    this.userForm = new FormGroup({
      'name': new FormControl(null, [Validators.required,Validators.minLength(3)]),
      'uname': new FormControl(null, Validators.required),
      'email':new FormControl(null, [Validators.required,Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'website': new FormControl(null, Validators.required)
    })

    console.log('ooooo',this.userservice.dataToUpdate)
    this.userInput.name=this.userservice.dataToUpdate.updateName;
    this.userInput.uname=this.userservice.dataToUpdate.updateUname;
    this.userInput.email=this.userservice.dataToUpdate.updateEmail;
    this.userInput.phone=this.userservice.dataToUpdate.updatePhone;
    this.userInput.website=this.userservice.dataToUpdate.updateWebsite;
    this.userInput.id=this.userservice.dataToUpdate.id;
  }

  submitit(){
    this.userservice.compareUser(this.userInput);
    this.changesSaved = true;
    this.allowEdit = true;
    this.router.navigate(['/']);
  }

  // onSubmit(){
  //   this.submitted = true;
  //   console.log('signup form',this.userForm)
  //   const firstname=this.userForm.get('name').value;
  //   const username=this.userForm.get('uname').value;
  //   const email=this.userForm.get('email').value;
  //   const phone=this.userForm.get('phone').value;
  //   const website=this.userForm.get('website').value;
  //   console.log('maaaaaad',firstname)
  //   this.userservice.arrayForUserform(firstname,username,email,phone,website)
  //   this.router.navigate(['/']);
  // }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if(this.allowEdit){
      return true;
    }
    if(this.userInput.name !== this.userservice.dataToUpdate.updateName ||
       this.userInput.uname !==this.userservice.dataToUpdate.updateUname ||
       this.userInput.email !==this.userservice.dataToUpdate.updateEmail ||
       this.userInput.phone !==this.userservice.dataToUpdate.updatePhone || 
       this.userInput.website !==this.userservice.dataToUpdate.updateWebsite
       && !this.changesSaved){
      return confirm('Do you want discard the changes ?')
    }else{
      return true;
    }
  }
}
