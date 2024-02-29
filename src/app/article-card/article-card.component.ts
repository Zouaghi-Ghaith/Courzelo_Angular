import { Component, Input } from '@angular/core';
import { ArticleService } from '../Services/article.service';




@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() publication: any;
  constructor(private articleService: ArticleService) { }




}


