import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit,OnDestroy {
  @Input('user')user;
  colorValue="primary"
  userData;
  sub;
  sub2;
  buttonValue:String = "Follow";

  constructor(private auth:AuthService,private userService:UserService) {
    this.userData = this.auth.userData;
   }

  ngOnInit() {    
     this.userData.user.following.forEach(elem => {
      if(elem.user_id == this.user.user_id){
        this.buttonValue="Following"
      }
    })

     this.userData.user.followers.forEach(elem => {
      if(elem.user_id == this.user.user_id){
        if(this.buttonValue !="Following")
        this.buttonValue="Follow Back"
      }
     })
     if(this.buttonValue=="Follow" || this.buttonValue =="Follow Back"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }   
}

  followOrUnfollow(){
    if(this.buttonValue == "Follow" || this.buttonValue == "Follow Back"){
      this.buttonValue = "Following";
      this.sub = this.userService.follow(this.user,this.userData).subscribe((data:any)=>{});
      var followUser = {
        user_id:this.user.user_id,
      }
      this.auth.userData.user.following.push(followUser);

    }
    else if(this.buttonValue == "Following"){
      this.buttonValue = "Follow";
      this.sub2 = this.userService.unfollow(this.user,this.userData).subscribe((data:any)=>{});
    this.auth.userData.user.following = this.auth.userData.user.following.filter((val)=>{
      if(val.user_id!=this.user.user_id){
        return true
      }
    })
    }
    if(this.buttonValue=="Follow" || this.buttonValue=="Follow Back"){
      this.colorValue="primary";
    }
    else{
      this.colorValue="warn"
    }
}

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }
}
