import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PlaceholderComponent } from "../../../../shared/components/placeholder/placeholder.component";
import { ModalDataService } from '../../../../shared/services/modal-data.service';
import { UserData } from '../../../Authentication/models/user-data';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from "../post-card/post-card.component";
import { PostModalComponent } from '../post-modal/post-modal.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@Component({
  selector: 'app-posts-list',
  imports: [PostCardComponent, PlaceholderComponent, InfiniteScrollModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  subscription = new Subscription();
  private readonly postService = inject(PostService)
  private readonly auth = inject(AuthService)
  private modalService = inject(NgbModal);
  private modalDataService = inject(ModalDataService)
  posts: Post[] = [] as Post[];
  userData: UserData = {} as UserData;
  page = 1;
  limit = 5;
  loading = false;
  allLoaded = false;

  ngOnInit(): void {
    this.getAllPosts()
    this.getUserData()


  }

  getUserData() {
    this.subscription = this.auth.getLoggedUserData().subscribe({
      next: (data) => {
        this.userData = data
      }
    })
  }

  openModal(reason: string, e?: any) {
    if(!e){
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
        this.getAllPosts()

      }
    })
  }



  loadPosts() {
    if(this.loading || this.allLoaded) return;
    this.loading=true
    this.subscription = this.postService.getAllPosts(this.page).subscribe({
      next: (res) => {
        if(this.posts.length == 0 ) {
          this.allLoaded = true
        }else {
          this.posts = [...this.posts , ...res.posts]
          this.loading = false
          this.page++;
        }
      },
      error:()=>{
        this.loading = false
      }
    })
  }
  getAllPosts() {

    this.subscription = this.postService.getAllPosts().subscribe({
      next: (res) => {
      this.posts = res.posts
      }
    })
  }

  deletePost(postId: string) {
    this.subscription = this.postService.deletePost(postId).subscribe({
      next: (res) => {
        this.getAllPosts()
      }
    })
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
