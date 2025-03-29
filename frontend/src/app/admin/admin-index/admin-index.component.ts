import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-index',
  standalone: false,
  templateUrl: './admin-index.component.html',
  styleUrl: './admin-index.component.css'
})
export class AdminIndexComponent {
  constructor(private _admin:AdminService){}

  updateRoleForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    newRole: new FormControl('', [Validators.required])
  });

  onSubmit() {
      alert("Role Update Form Submitted");
      this._admin.updateRole(this.updateRoleForm.value).subscribe(
          () => {
            console.log(this.updateRoleForm.value);
              console.log("Role update form submitted");
              alert("Role updated successfully!");
          },
          (error: any) => {
              console.error("Error during role update:", error);
              alert("Role update failed!");
          }
      );
  }

}