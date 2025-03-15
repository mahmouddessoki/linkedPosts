import { Component, inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentCardComponent } from "../comment-card/comment-card.component";

@Component({
  selector: 'app-post-comments',
  imports: [CommentCardComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss'
})
export class PostCommentsComponent {
  @Input({ required: true }) postId!: string;
  private commentService = inject(CommentsService)
  subscription = new Subscription()
  comments:Comment[]=[] as Comment[];
  ngOnInit(){
    this.getPostComments()
  }
  getPostComments(){
    this.subscription = this.commentService.getPostComments(this.postId).subscribe({
      next: res => {
        this.comments = res.comments
      },

    })
  }
}
