import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../../env/env.dev';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  getPostComments(postId: string): Observable<any> {
    return this.http.get(`${env.BASE_URL}posts/${postId}/comments`)
  }
  updateComment(commentId: string, content: string): Observable<any> {
    return this.http.put(`${env.BASE_URL}comments/${commentId}`, {
      content
    })
  }
  createComment(post: string, content: string): Observable<any> {
    return this.http.post(`${env.BASE_URL}comments`, {
      content,
      post
    })
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${env.BASE_URL}comments/${commentId}`)
  }
  addComment(postId: string,content:string): Observable<any> {
    return this.http.post(`${env.BASE_URL}comments`,{
      content,
      post: postId
    })
  }


}
