import { Component, HostListener, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';

@Component({
  selector: 'app-user',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  

}
