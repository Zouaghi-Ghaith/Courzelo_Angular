import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../Services/article.service';
import { Publication } from '../Services/publication.model';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Publication[] = [];
  sortBy: 'netScore' | 'commentCount' = 'netScore';


  constructor(

    private articleService: ArticleService,
    private cdr: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.articleService.getAllArticles().subscribe(

      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }

  sortArticles(): void {
    console.log('Sort method called');
    console.log('Current sortBy value:', this.sortBy);

    if (this.sortBy === 'netScore') {
      this.articles.sort((a, b) => b.netScore - a.netScore);
      console.log('Articles sorted by netScore');
    } else if (this.sortBy === 'commentCount') {
      this.articles.sort((a, b) => {
        const aCommentsLength = a.comments ? a.comments.length : 0;
        const bCommentsLength = b.comments ? b.comments.length : 0;
        return bCommentsLength - aCommentsLength;
      });
      console.log('Articles sorted by commentCount');
    }

    console.log('Sorted articles:', this.articles);
    this.cdr.detectChanges();



  }
}
