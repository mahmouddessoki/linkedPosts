import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalDataService } from '../../../../shared/services/modal-data.service';
import { Post } from '../../../posts/models/post';
import { Comment } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentCardComponent } from "../comment-card/comment-card.component";
import { CommentModalComponent } from '../comment-modal/comment-modal.component';

@Component({
  selector: 'app-post-comments',
  imports: [CommentCardComponent],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss'
})
export class PostCommentsComponent {
  @Input({ required: true }) post!: Post;
  private commentService = inject(CommentsService)
  private modalDataService = inject(ModalDataService);
  private modalService = inject(NgbModal);

  subscription = new Subscription()
  comments: Comment[] = [] as Comment[];
  len = 1
  allComments: boolean = false;
  numOfComments: WritableSignal<number> = signal<number>(1)
  addComment(postId: string) {
    let data = {
      postId: postId,
      reason: 'add'
    }
    this.modalDataService.modalData.set(data)
    const modalRef = this.modalService.open(CommentModalComponent, {
      size: 'lg',
      backdrop: 'static'
    })

    modalRef.result.then(
      (result) => { },
      (reason) => {
        if (reason == "success") {
          this.getPostComments()
        }
      })
  }


  getAllComments() {
    this.allComments = !this.allComments;
    if (this.allComments) {
      this.numOfComments.set(this.comments.length)
    } else {
      this.numOfComments.set(1)
    }
  }
  openModal(e: any) {
    e.reason = "update"
    this.modalDataService.modalData.set(e)
    const modalRef = this.modalService.open(CommentModalComponent, {
      size: 'lg',
      backdrop: 'static'
    })
    modalRef.result.then((result) => {
    }, (reason) => {
      console.log(reason);
      if (reason == "success") {
        this.getPostComments()
      }
    })
  }
  ngOnInit() {
    this.getPostComments()
  }
  getPostComments() {
    this.subscription = this.commentService.getPostComments(this.post._id).subscribe({
      next: res => {
        this.comments = res.comments
      },

    })
  }
  deleteComment(id: string) {

    this.commentService.deleteComment(id).subscribe({
      next: (res) => {
        this.getPostComments()
       
      }
    })

  }


}



