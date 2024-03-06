import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Publication } from '../Services/publication.model';
import { Comment } from '../Services/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8081/publications';
  private commentApiUrl = 'http://localhost:8081/comments';
  private voteApiUrl = 'http://localhost:8081/api/vote';
  private uploadUrl = 'http://localhost:8081/files/upload';

  constructor(private http: HttpClient) {
  }

  getAllArticles(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiUrl}/getAll`).pipe(
      map((articles: Publication[]) => {
        return articles.map(article => {
          article.upvoteCount = article.votes.filter(vote => vote.upvoted).length;
          article.downvoteCount = article.votes.filter(vote => vote.downvoted).length;
          return article;
        });
      })
    );
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


        // Calculate the net score if needed
        article.netScore = article.upvoteCount - article.downvoteCount;

        return article;
      })
    );
  }


  updateArticle(article: Publication): Observable<Publication> {
    const updateUrl = `${this.apiUrl}/update/${article.idPublication}`;
    return this.http.put<Publication>(updateUrl, article);
  }

  getCommentsByArticleId(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.commentApiUrl}/comments/${articleId}`);
  }

  addComment(articleId: number, content: string): Observable<Comment> {
    const url = `${this.commentApiUrl}/add/${articleId}`;
    return this.http.post<Comment>(url, {content});
  }

  upvoteArticle(articleId: number): Observable<void> {
    return this.http.put<void>(`${this.voteApiUrl}/upvote/${articleId}`, {});
  }

  downvoteArticle(articleId: number): Observable<void> {
    return this.http.put<void>(`${this.voteApiUrl}/downvote/${articleId}`, {});
  }

  undoVote(articleId: number, isUpvote: boolean): Observable<void> {
    const url = `${this.voteApiUrl}/ivote/${articleId}?isUpvote=${isUpvote}`;
    return this.http.delete<void>(url);
  }

}
