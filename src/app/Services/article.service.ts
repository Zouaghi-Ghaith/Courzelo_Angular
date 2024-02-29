import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Publication } from '../Services/publication.model';
import { Comment } from '../Services/Comment.model';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081/Corzello/publications';
  private commentApiUrl = 'http://localhost:8081/Corzello/comments';
  private voteApiUrl = 'http://localhost:8081/Corzello/api/vote'; // Update this with your actual backend API URL

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/getAll`);
  }

  deleteArticle(articleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${articleId}`);
  }

  addPublication(publication: Publication): Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/add`, publication);
  }

  getArticleById(articleId: number): Observable<Publication> {
    return this.http.get<Publication>(`${this.apiUrl}/${articleId}`).pipe(
      map((article: Publication) => {
        // Calculate vote counts for the single article
        article.upvoteCount = article.votes.filter(vote => vote.upvoted).length;
        article.downvoteCount = article.votes.filter(vote => vote.downvoted).length;
        return article;
      })
    );
  }


  updateArticle(article: Publication): Observable<Publication> {
    const updateUrl = `${this.apiUrl}/update/${article.idPublication}`;
    console.log('Updating article:', article);
    return this.http.put<Publication>(updateUrl, article);
  }

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentApiUrl}/comments/${articleId}`);
  }

  addComment(articleId: number, content: string): Observable<Comment> {
    const url = `${this.commentApiUrl}/add/${articleId}`;
    return this.http.post<Comment>(url, { content });
  }

  upvoteArticle(articleId: number): Observable<void> {
    return this.http.put<void>(`${this.voteApiUrl}/upvote/${articleId}`, {});
  }

  downvoteArticle(articleId: number): Observable<void> {
    return this.http.put<void>(`${this.voteApiUrl}/downvote/${articleId}`, {});
  }
}
