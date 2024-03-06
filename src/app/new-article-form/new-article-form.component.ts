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
    selectedFile: File | undefined; // Store the selected file

    constructor(
      private router: Router,
      private articleService: ArticleService,
      private formBuilder: FormBuilder,
       // Inject FileUploadService
    ) {
      this.createForm();
      this.submitted = false;
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

      // Create FormData object to append form data including the selected file
      const formData = new FormData();
      formData.append('file', this.selectedFile); // Append the selected file
      formData.append('title', this.publicationForm.value.title);
      formData.append('description', this.publicationForm.value.description);
      formData.append('body', this.publicationForm.value.body);
      formData.append('tags', this.publicationForm.value.tags);


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



    // Method to handle file selection
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }

    // Getter methods for form controls
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
