import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user = new User();
  allUsers = [];
  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {
  }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({idField: 'id'})
    .subscribe((changes: any)=> {
      console.log('Received changes from DB', changes);
      this.allUsers = changes;
    });
  }

  openDIalog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
