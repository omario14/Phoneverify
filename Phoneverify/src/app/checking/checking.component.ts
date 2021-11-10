import { Component, OnInit } from '@angular/core';

import { data, post } from 'jquery';
import {HttpClient} from '@angular/common/http'
import { FormBuilder, FormGroup, Validators,AbstractControl,ValidationErrors ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-checking',
  templateUrl: './checking.component.html',
  styleUrls: ['./checking.component.css']
})
export class CheckingComponent implements OnInit {

  
  submitted = false;
  isvalid= undefined;
  data ={valid: "", number: "", local_format: "", international_format: "", country_prefix: "",country_code:"",country_name:"",carrier:"",
  line_type:""}
  country_codes= [];
  country_flags= [];
  error=false;
  lessthen_8 =false;
  

    form= this.fb.group({
    country: [null, [Validators.required]],
    number: [null,[Validators.required,
      Validators.pattern("^[0-9]*$"),
    Validators.minLength(8),Validators.maxLength(10)]],
    
  });
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
   }


  constructor(private fb: FormBuilder) {}
 
  onSubmit(): void {
    this.submitted = true;

     var country =this.form.get('country').value;
     var number =this.form.get('number').value ;
     if (!(typeof number === "number" )){
      this.error = true;
      return;
  }
  if (!(number.toString().length  >=8)) {
    this.lessthen_8 = true;
   return;
}
     var access_key = 'eb588dbf70cb81df1c8d374269db9d18';
     fetch('http://apilayer.net/api/validate?access_key=' + access_key + '&number=' + number + '&country_code='+ country ).then(res=>{
        return res.json();
  
       }).then(data =>{this.isvalid = data.valid
     
       
         this.data = data ;})


       
       
  }
  
  get f(): { [key: string]: any } {

    var x = this.form.get('number');
  
    return x
  
  }
 
  ngOnInit(): void {
   
    this.form= this.fb.group({
      country: [null, [Validators.required]],
      number:new FormControl (null,[Validators.required,
        Validators.pattern("^[0-9]*$"),
      Validators.minLength(8),Validators.maxLength(10)]),
      
      
    });
    fetch('https://restcountries.com/v2/all').then(res =>{
      return res.json();
    }).then(data =>{data.forEach(element => {this.country_codes.push(element.alpha2Code)
         
    });})
  
    fetch('https://restcountries.com/v2/all').then(res =>{
      return res.json();
    }).then(data =>{data.forEach(element => {this.country_flags.push(element.flag)
         
    });

  })
    
    
    
  }
  
  onReset(): void {
    this.submitted = false;
    this.error=false;
    this.form.reset();
    this.lessthen_8= false;
  }

  
  
  
   
 

  


  
    


   
  


}

