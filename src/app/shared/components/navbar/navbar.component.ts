import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/Authentication/services/auth.service';
import { UserData } from '../../../features/Authentication/models/user-data';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgbDropdownModule, NgbCollapseModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly auth = inject(AuthService)
  private readonly router = inject(Router)
  // isAuthorized: Signal<boolean> = computed(() => this.auth.isLoggedIn())
  // isDropped: Signal<boolean> = computed(() => this.auth.isDropdown())
  // layout: InputSignal<string> = input<string>('')
  userData: UserData = {} as UserData;
  isCollapsed = true;
  subscription=new Subscription()

  ngOnInit() {
    if (this.auth.isLoggedIn() === false) {
      this.router.navigate(['/login'])
    }
    this.getUserData()
  }
  getUserData() {
    this.subscription = this.auth.getLoggedUserData().subscribe({
      next: (data) => {
        this.userData = data
        console.log(data);
      }
    })
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])

  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
