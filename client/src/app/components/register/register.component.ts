import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { UsersService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public userRegisterForm!: FormGroup;
  public userRegisterSecondForm!: FormGroup;
  public id!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public passwordConfirm!: FormControl;
  public city!: FormControl;
  public street!: FormControl;
  public username!: FormControl;
  public surname!: FormControl;

  public buttonsDisabled: boolean = true;
  public uniqueId: boolean = false;
  public uniqueEmail: boolean = false;
  public idUnique: boolean = false;
  public emailUnique: boolean = false;
  public errorMessage: string = '';
  public cities: string[] = ['Akko', 'Ashdod', 'Ashkelon',
    'Eilat', 'Haifa', 'Herzliya', 'Jerusalem', 'Netanya', 'Tel Aviv', 'Rehovot'];

  constructor(public usersService: UsersService, private router: Router) {
    this.usersService = usersService;
  }

  public onOptionSelected(event: any): void {
    this.city = event.target.value;
  }

  public onRegister = (): void => {
   
    if ( !this.userRegisterForm.controls.city.errors &&
    !this.userRegisterForm.controls.street.errors && !this.userRegisterForm.controls.username.errors
    && !this.userRegisterForm.controls.surname.errors) {

      let registerDetails = new UserRegisterDetails(this.userRegisterForm.value.id,
        this.userRegisterForm.value.email, this.userRegisterForm.value.password,
        this.userRegisterForm.value.city, this.userRegisterForm.value.street,
        this.userRegisterForm.value.username, this.userRegisterForm.value.surname);

      const observable = this.usersService.register(registerDetails);

      observable.subscribe(SuccessfullServerRequestData => {
        console.log(SuccessfullServerRequestData);
        this.usersService.setLoginToken('token',"Bearer " + SuccessfullServerRequestData.token);
        this.usersService.setLoginToken('userType', SuccessfullServerRequestData.userType);
        this.usersService.setLoginToken('userName', SuccessfullServerRequestData.firstname);
        this.router.navigate(["/login"]);
      }, serverErrorResponse => {
        console.log("Error 13!" + serverErrorResponse);
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly';
    }

  }

  public onCheckFirstStep(): void {
    this.id = new FormControl("", [Validators.required,
    Validators.minLength(9), Validators.maxLength(9),
    Validators.pattern("^[0-9]{9}$")]);
    this.email = new FormControl("", [Validators.required, Validators.minLength(8),
    Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
    this.password = new FormControl("", [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]);
    this.passwordConfirm = new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(14)]);
    this.city = new FormControl({value:"",disabled:true}, [Validators.required]);
    this.street = new FormControl({value:"",disabled:true}, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]);
    this.username = new FormControl({value:"",disabled:true}, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
    this.surname = new FormControl({value:"",disabled:true}, [Validators.required, Validators.minLength(5), Validators.maxLength(15)]);
   
    // Initializing the from group
    this.userRegisterForm = new FormGroup({
      id: this.id,
      email: this.email,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      city: this.city,
      street: this.street,
      username: this.username,
      surname: this.surname
    });
  }




  public checkEmail = () => {
    const observable1 = this.usersService.checkEmailUnique(this.email.value);
    observable1.subscribe(SuccessfullServerRequestData => {
      if (SuccessfullServerRequestData === false) {
        this.emailUnique = false;
      } else {
        this.emailUnique = true;
      }

    }, serverErrorResponse => {
      console.log("Error 18!" + serverErrorResponse);
    });
    return this.emailUnique;
  }

  public checkId = () => {
    const observable = this.usersService.checkIdUnique(this.id.value);
    observable.subscribe(SuccessfullServerRequestData => {
      if (SuccessfullServerRequestData == false) {
        console.log('new')
        this.idUnique = false;
      } else {
        this.idUnique = true;
      }
    }, serverErrorResponse => {
      console.log("Error 17!" + serverErrorResponse);
    });
    return this.idUnique;
  }




  async onArrowFunction() {
   
    if (this.idUnique === true && this.emailUnique === true && 
        !this.userRegisterForm.controls.id.errors && !this.userRegisterForm.controls.email.errors &&
        !this.userRegisterForm.controls.password.errors && !this.userRegisterForm.controls.passwordConfirm.errors
        && this.password.value === this.passwordConfirm.value) {
        console.log('continueeee');
       this.buttonsDisabled = !this.buttonsDisabled;
       this.userRegisterForm.get('city')?.enable();
       this.userRegisterForm.get('street')?.enable();
       this.userRegisterForm.get('username')?.enable();
       this.userRegisterForm.get('surname')?.enable();
       this.errorMessage = "";
    }
    else {
      this.errorMessage = "*please fill all fields correctly!";
      console.log('error in first step validation');
    }

  }


  ngOnInit(): void {
    this.onCheckFirstStep();
  }


}
