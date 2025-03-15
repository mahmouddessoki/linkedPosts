import { Component, inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserData } from '../../../Authentication/models/user-data';
import { AuthService } from '../../../Authentication/services/auth.service';
import { PostsListComponent } from "../../../posts/components/posts-list/posts-list.component";

@Component({
  selector: 'app-timeline',
  imports: [PostsListComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  userData: UserData = {} as UserData;
   subscription = new Subscription();
  private readonly auth = inject(AuthService)
  ngOnInit(): void {
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

}
