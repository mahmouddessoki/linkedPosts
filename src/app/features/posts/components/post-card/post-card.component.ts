import { Component, Input, output, OutputEmitterRef } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PostCommentsComponent } from "../../../comments/components/post-comments/post-comments.component";
import { Post } from '../../models/post';
import moment from 'moment';


@Component({
  selector: 'app-post-card',
  imports: [PostCommentsComponent, NgbDropdownModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post: Post = {} as Post;
  numOfComments: number = 1;
  onDeletePost: OutputEmitterRef<string> = output();
  onUpdatePost: OutputEmitterRef<{
    post:Post
  }> = output();
  onAddComment: OutputEmitterRef<string> = output();


  deletePost() {
    this.onDeletePost.emit(this.post._id);

  }
  updatePost() {
    this.onUpdatePost.emit({post:this.post});
  }
  addComment(id: string) {
    this.onAddComment.emit(id);
  }

  getRelativeTime() {
    return moment(this.post.createdAt).startOf('hour').fromNow();
    // Example: "in a year" or "2 days ago"
  }


}
