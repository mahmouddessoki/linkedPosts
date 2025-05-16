import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDataService } from '../../../../shared/services/modal-data.service';
import { CommentsService } from '../../services/comments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-modal',
  imports: [FormsModule],
  templateUrl: './comment-modal.component.html',
  styleUrl: './comment-modal.component.scss'
})
export class CommentModalComponent {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly modalDataService = inject(ModalDataService);
  private readonly commentService = inject(CommentsService);
  private readonly toaster = inject(ToastrService);

  content!: string;
  id!: string;
  postId!: string;
  reason!: string;

  ngOnInit() {
    if (this.modalDataService.modalData().reason == "update") {

      this.content = this.modalDataService.modalData().content
      this.id = this.modalDataService.modalData().id
    } else {
      this.content = ""
      this.postId = this.modalDataService.modalData().postId

    }
    this.reason = this.modalDataService.modalData().reason

  }
  UpdateComment() {
    this.commentService.updateComment(this.id, this.content).subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.toaster.success('Comment Updated successfully');
          this.closeModal('success');
        }
      }
    })
  }
  addComment() {
    this.commentService.addComment(this.postId, this.content).subscribe({
      next: (res) => {
        if (res.message == "success") {
          this.toaster.success('Comment added successfully');
          this.closeModal('success');
        }
      }
    })
  }

  closeModal(reason: string) {
    this.activeModal.dismiss(reason);
  }


}
