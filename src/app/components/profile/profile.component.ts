import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  addNewNoteForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(100),
    ]),
  });
  editForm = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    desc: new FormControl(null, [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(100),
    ]),
  });

  userData: any[] = [];
  errorDelete: string = '';

  constructor(
    private _AuthService: AuthService,
    private _NoteService: NoteService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    if (this._AuthService.currentUser.getValue() == null) {
      this._Router.navigate(['/login']);
    } else {
      this.getUserData();
    }
  }

  addNote() {
    console.log(this._AuthService.currentUser);
    let user = {
      title: this.addNewNoteForm.value.title,
      desc: this.addNewNoteForm.value.desc,
      userID: this._AuthService.currentUser.getValue()._id,
      token: localStorage.getItem('userToken'),
    };
    this._NoteService.addNoteInService(user).subscribe(
      (response) => {
        if (response.message == 'success') {
          (<HTMLElement>document.querySelector('.succ')).style.top = '85%';
          setTimeout(() => {
            (<HTMLElement>document.querySelector('.succ')).style.top = '110%';
          }, 2000);
          this.resetValues();
          this.getUserData();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  resetValues() {
    this.addNewNoteForm.reset();
    $('#addNote').modal('hide');
    this.editForm.reset();
    $('#editNote').modal('hide');
  }
  getUserData() {
    this._NoteService.getUserNotes().subscribe(
      (response) => {
        if (response.message == 'success') {
          this.userData = response.Notes;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  callDelet(id: string) {
    let deleteObj = {
      NoteID: id,
      token: localStorage.getItem('userToken'),
    };
    this._NoteService.deleteNote(deleteObj).subscribe(
      (response) => {
        if (response.message == 'deleted') {
          this.getUserData();
        }
      },
      () => {
        this.errorDelete = 'Error try again';
      }
    );
  }
  editID: string = '';
  callEdit(id: string) {
    for (let i = 0; i < this.userData.length; i++) {
      if (this.userData[i]._id == id) {
          this.editForm.controls['title'].setValue(this.userData[i].title);
          this.editForm.controls['desc'].setValue(this.userData[i].desc);
          break;
      }
    }
    $('#editNote').modal('show');
    this.editID = id;
  }
  editNote() {
    let editObj = {
      title: this.editForm.value.title,
      desc: this.editForm.value.desc,
      NoteID: this.editID,
      token: <string>localStorage.getItem('userToken'),
    };
    this._NoteService.updateNote(editObj).subscribe(
      (response) => {
        if (response.message == "updated") {
          this.getUserData();
          this.resetValues();
        }
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
