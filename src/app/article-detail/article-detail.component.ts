import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../Services/article.service';
import { Publication } from '../Services/publication.model';
import { Comment } from "../Services/comment.model";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  article: Publication;
  comments: Comment[];
  newComment: string;
  netScore: number;
  upvoted: boolean;
  downvoted: boolean;
  isUpvoted: boolean = false;
  isDownvoted: boolean = false;
  commentCount: number;

  isEditing: boolean = false;
  updatedArticle: Publication;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.fetchArticle();

  }

  fetchArticle(): void {
    const idPublication = +this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(idPublication).subscribe(
      (article: Publication) => {
        this.article = article;
        this.netScore = article.upvoteCount - article.downvoteCount;


        this.getComments();
      },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }


  handleDelete(): void {
    this.articleService.deleteArticle(this.article.idPublication).subscribe(
      () => {
        console.log('Article deleted successfully.');
        // Optionally, navigate to a different page or update your UI
      },
      (error) => {
        console.error('Error deleting article:', error);
      }
    );
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.updatedArticle = {...this.article};
    } else {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    this.articleService.updateArticle(this.updatedArticle).subscribe(
      (updatedArticle: Publication) => {
        this.article = updatedArticle;
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating article:', error);
      }
    );
  }

  getComments(): void {
    this.articleService.getCommentsByArticleId(this.article.idPublication)
      .subscribe(comments => this.comments = comments);
  }

  addComment(): void {
    if (!this.newComment) {
      console.error('Comment cannot be empty');
      return;
    }
    this.articleService.addComment(this.article.idPublication, this.newComment)
      .subscribe(
        (comment: Comment) => {
          this.comments.push(comment);
          this.newComment = ''; // Clear the input field
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
  }

  upvote(): void {
    this.articleService.upvoteArticle(this.article.idPublication).subscribe(() => {

      console.log('upvoted');
    });
  }

  downvote(): void {
    this.articleService.downvoteArticle(this.article.idPublication).subscribe(() => {

      console.log('downvoted');
    });
  }

  undoVote(isUpvote: boolean): void {
    const idPublication = this.article.idPublication;
    this.articleService.undoVote(idPublication, isUpvote).subscribe(
      () => {
        console.log('Vote undone successfully.');
        if (isUpvote) {
          this.upvoted = false;
        } else {
          this.downvoted = false;
        }
        // Optionally, update UI or take other actions
      },
      (error) => {
        console.error('Error undoing vote:', error);
      }
    );
  }



  toggleVote(upvote: boolean): void {
    if (upvote) {
      if (!this.isUpvoted) {
        // If not upvoted, upvote the article
        this.upvote();
        this.isUpvoted = true;
        this.isDownvoted = false; // Reset downvote state
      } else {
        // If already upvoted, undo the upvote
        this.undoVote(true); // Pass true for upvote
        this.isUpvoted = false;
      }
    } else {
      if (!this.isDownvoted) {
        // If not downvoted, downvote the article
        this.downvote();
        this.isDownvoted = true;
        this.isUpvoted = false; // Reset upvote state
      } else {
        // If already downvoted, undo the downvote
        this.undoVote(false); // Pass false for downvote
        this.isDownvoted = false;
      }
    }
  }


}
