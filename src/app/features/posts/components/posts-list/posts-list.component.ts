import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../Authentication/services/auth.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-posts-list',
  imports: [PostCardComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
   subscription = new Subscription();
    private readonly postService = inject(PostService)
    posts: Post[] = [] as Post[];
    ngOnInit(): void {
      this.getAllPosts()
    }

    getAllPosts() {
      this.postService.getAllPosts().subscribe({
        next: (res) => {
          this.posts = res.posts;
        }
      })
    }

}
