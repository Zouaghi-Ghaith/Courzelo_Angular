import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../Services/article.service';
import { Publication } from '../Services/publication.model';
import {Comment} from '../Services/Comment.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Publication[] = [];



  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles()
      .subscribe(
        (articles: Publication[]) => {
          console.log('Received articles:', articles); // Log received articles
          this.articles = articles;
        },
        (error) => {
          console.error('Error fetching articles:', error);
        }
      );
  }


}
