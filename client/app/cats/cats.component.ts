import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CatService } from '../services/cat.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})

export class CatsComponent implements OnInit {
  
  cat = new Cat();
  cats: Cat[] = [];
  isLoading = true;
  isEditing = false;
  

  addCatForm: FormGroup;
  coin = new FormControl('', Validators.required);
  amount = new FormControl('', Validators.required);
  type = new FormControl('');
  user = new FormControl('');
  
  constructor(private catService: CatService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getCats();
	let user1 = document.getElementById("getUserFrom").innerHTML.split('(')[1];
	user1 = user1.split(')')[0];
	
    this.addCatForm = this.formBuilder.group({
      coin: this.coin,
      amount: this.amount,
      type: this.type,
	  user: user1,
    });
  }

  getCats() {
	let user = document.getElementById("getUserFrom").innerHTML.split('(')[1];
	user = user.split(')')[0];
    this.catService.getCats(user).subscribe(
      data => this.cats = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  addCat() {
	  
    this.catService.addCat(this.addCatForm.value).subscribe(
      res => {
        this.cats.push(res);
        this.addCatForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(cat: Cat) {
    this.isEditing = true;
    this.cat = cat;
  }

  cancelEditing() {
    this.isEditing = false;
    this.cat = new Cat();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getCats();
  }

  editCat(cat: Cat) {
    this.catService.editCat(cat).subscribe(
      () => {
        this.isEditing = false;
        this.cat = cat;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }
  
  
  
  deleteCat(cat: Cat) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.catService.deleteCat(cat).subscribe(
        () => {
          const pos = this.cats.map(elem => elem._id).indexOf(cat._id);
          this.cats.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}


//invalid solution
//var user = document.getElementById("getUserFrom").innerHTML.split("(\(|\))")[1];
//console.log(user);
/*window.onload = function(){
	
	let user = document.getElementById("getUserFrom").innerHTML.split('(')[1];
	user = user.split(')')[0];
	(<HTMLInputElement>document.getElementById("catUser")).value = user;
	//(<HTMLInputElement>document.getElementById("catUser")).class += "ng-valid";
};*/