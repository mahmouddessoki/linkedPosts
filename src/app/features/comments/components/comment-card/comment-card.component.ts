import { Component, Input, output, OutputEmitterRef } from '@angular/core';
import { Comment } from '../../models/comment';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-comment-card',
  imports: [NgbDropdownModule],
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent {
  @Input({ required: true }) comment!: Comment;
  onDeleteComment: OutputEmitterRef<string> = output();
  onUpdateComment: OutputEmitterRef<{id:string,content:string}> = output();

  deleteComment() {
    this.onDeleteComment.emit(this.comment._id);
  }
  updateComment() {
    this.onUpdateComment.emit({id:this.comment._id,content:this.comment.content});
  }
   getRelativeTime() {
      return moment(this.comment.createdAt).startOf('hour').fromNow();
      // Example: "in a year" or "2 days ago"
    }
}
