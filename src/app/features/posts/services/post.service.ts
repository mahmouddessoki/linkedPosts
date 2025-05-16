import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../../env/env.dev';
import { AuthService } from '../../Authentication/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllPosts(page?: number): Observable<any> {
    let url = `${env.BASE_URL}posts?limit=5`
    if (page) {
      url += `&page=${page}`
    } else {
      url += `&page=1`
    }
    return this.http.get(url)
  }
  getUserPosts(userId: string): Observable<any> {
    return this.http.get(`${env.BASE_URL}users/${userId}/posts?limit=2`)
  }
  getPost(postId: string): Observable<any> {
    return this.http.get(`${env.BASE_URL}posts/${postId}`)
  }

  addPost(formData: FormData): Observable<any> {
    return this.http.post(`${env.BASE_URL}posts`, formData)
  }

  deletePost(postId: string): Observable<any> {
    const token = this.auth.getToken();
    return this.http.delete(`${env.BASE_URL}posts/${postId}`, {
      headers: {
        token: token!.toString()
      }
    })
  }

  updatePost(postId: string, formData: FormData): Observable<any> {
    return this.http.put(`${env.BASE_URL}posts/${postId}`, formData)
  }


}
