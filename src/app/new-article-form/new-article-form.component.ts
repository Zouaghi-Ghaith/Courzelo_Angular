  import {Component, Input} from '@angular/core';
  import { Router } from '@angular/router';

  import {ArticleService} from "../Services/article.service";
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';



  @Component({
    selector: 'app-new-article-form',
    templateUrl: './new-article-form.component.html'
  })
  export class NewArticleFormComponent {
    @Input() publication: any;
    submitted = false;
    publicationForm: FormGroup;


    constructor(
      private router: Router,
      private articleService: ArticleService,
      private formBuilder: FormBuilder
    ) {
      this.createForm();
      this.submitted   = false;
    }



    createForm() {
    this.publicationForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(50)]],
      tags: ['']
    });
  }

  get f() { return this.publicationForm.controls; }




    submitForm(): void {
      this.submitted = true;
      this.publication = this.publicationForm.value;
      console.log('Publication data:', this.publication); // Log the form data before submission
      console.log('Publication form validity:', this.publicationForm.valid); // Log the form validity
      console.log('Publication form errors:', this.publicationForm.errors); // Log any form errors

      // Proceed with form submission
      this.articleService.addPublication(this.publication).subscribe(
        () => {
          console.log('Article added successfully.');
          this.router.navigate(['/article-card']);
        },
        (error) => {
          console.error('Error adding publication:', error);

        }
      );
    }


    get title() {
      return this.publicationForm.get('title');
    }

    get description() {
      return this.publicationForm.get('description');
    }

    get body() {
      return this.publicationForm.get('body');
    }

    get tags() {
      return this.publicationForm.get('tags');
    }




  }
