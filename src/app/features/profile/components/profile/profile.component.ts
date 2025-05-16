import { Component, inject } from '@angular/core';
import { AuthService } from '../../../Authentication/services/auth.service';
import { UserData } from '../../../Authentication/models/user-data';
import { Subscription } from 'rxjs';
import { Post } from '../../../posts/models/post';
import { PostService } from '../../../posts/services/post.service';
import { PostCardComponent } from "../../../posts/components/post-card/post-card.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDataService } from '../../../../shared/services/modal-data.service';
import { PostModalComponent } from '../../../posts/components/post-modal/post-modal.component';
import { PlaceholderComponent } from "../../../../shared/components/placeholder/placeholder.component";

@Component({
  selector: 'app-profile',
  imports: [PostCardComponent, PlaceholderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  private readonly auth = inject(AuthService)
  private readonly postsService = inject(PostService)
  private modalService = inject(NgbModal);
  private modalDataService = inject(ModalDataService)
  userData: UserData = {} as UserData;
  userPosts: Post[] = []
  subscription = new Subscription()
  noPosts:boolean = false



  ngOnInit() {
    this.getUserData()
  }
  getUserData() {
    this.subscription = this.auth.getLoggedUserData().subscribe({
      next: (data) => {
        this.userData = data
        this.getUserPosts()
        // console.log(data);
      }
    })
  }



  getUserPosts() {
    this.postsService.getUserPosts(this.userData.user._id).subscribe({
      next: (res) => {
        this.userPosts = res.posts;
        if (this.userPosts.length ==0) {
          this.noPosts = true
        }
      }
    })
  }

  deletePost(postId: string) {
    this.subscription = this.postsService.deletePost(postId).subscribe({
      next: (res) => {
        console.error(res);
        this.getUserPosts()
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  openModal(reason: string, e?: any) {
    if (!e) {
      e = {}
    }
    e.reason = reason;
    this.modalDataService.modalData.set(e)
    this.modalService.open(PostModalComponent, {
      size: 'lg',
      backdrop: 'static'
    }).result.then((result) => {
    }, (reason) => {
      if (reason == "success") {
        this.getUserPosts()
      }
    })
  }




}
