import { Component, Input } from '@angular/core';
import { Post } from '../../models/post';
import { PostCommentsComponent } from "../../../comments/components/post-comments/post-comments.component";

@Component({
  selector: 'app-post-card',
  imports: [PostCommentsComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post:Post={} as Post;

}
