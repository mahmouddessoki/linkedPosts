import { Component } from '@angular/core';
import { PostsListComponent } from "../../../posts/components/posts-list/posts-list.component";

@Component({
  selector: 'app-timeline',
  imports: [PostsListComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {



}
