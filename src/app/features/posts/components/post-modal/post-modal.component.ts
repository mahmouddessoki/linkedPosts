import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDataService } from '../../../../shared/services/modal-data.service';

@Component({
  selector: 'app-post-modal',
  imports: [FormsModule],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.scss'
})
export class PostModalComponent {

  private readonly activeModal = inject(NgbActiveModal);
  private readonly postService = inject(PostService);
  private readonly modalDataService = inject(ModalDataService);
  private readonly toaster = inject(ToastrService);
  selectedImg!: string;
  imagePreview: string | ArrayBuffer | null = null;
  imageSelected: boolean = false;
  selectedFile!: File;
  title!: string;
  postId!: string;
  reason!:string
  ngOnInit(){
    if (this.modalDataService.modalData().reason == "update") {

      this.title = this.modalDataService.modalData().post.body
      this.postId = this.modalDataService.modalData().post._id
    } else {
      this.title = ""
    }
    this.reason = this.modalDataService.modalData().reason
    console.log(this.reason);
  }

  closeModal(reason: string) {
    this.activeModal.dismiss(reason);
  }
  onDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files[0];

    this.handlePreview(file!);

  }


  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private handlePreview(file: File) {
    if (!file) {
      return;
    }
    this.selectedFile = file;
    this.selectedImg = file!.name;
    if (file && this.isImage(file)) {
      this.selectedImg = file.name;
      this.previewImage(file);
    } else {
      alert('Please drop a valid image file');
    }
  }

  private isImage(file: File): boolean {
    const fileType = file.type;
    return fileType.startsWith('image/');
  }

  // Preview the image
  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = reader.result;
      this.imageSelected = true;
    };
    reader.readAsDataURL(file);
  }


  select(e: any) {
    console.log(e);
    const file = e.target.files[0];
    this.handlePreview(file!);

  }

  addPost() {
    if (this.selectedFile || this.title) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('body', this.title);
      this.postService.addPost(formData).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.toaster.success('Post added successfully');
            this.closeModal('success');
          }
        },
        error: (err) => {

        }
      })

    } else {
      this.toaster.error('You must add Body or Image at least');

    }
  }
  updatePost() {
    if (this.selectedFile || this.title) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('body', this.title);
      this.postService.updatePost(this.postId, formData).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this.toaster.success('Post Updated Successfully');
            this.closeModal('success');
          }
        },
        error: (err) => {

        }
      })

    } else {
      this.toaster.error('You must add Body or Image at least');

    }
  }
}
