import { Routes } from '@angular/router';
import { AuthComponent } from './core/layouts/auth/auth.component';
import { LoginComponent } from './features/Authentication/components/login/login.component';
import { RegisterComponent } from './features/Authentication/components/register/register.component';
import { UserComponent } from './core/layouts/user/user.component';
import { authGuard } from './core/guards/auth.guard';
import { TimelineComponent } from './features/timeline/components/timeline/timeline.component';

export const routes: Routes = [

  {
    path: '',
    component: AuthComponent,
    canActivate: [authGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {path:'timeline',component:TimelineComponent}

    ]
  }
];
