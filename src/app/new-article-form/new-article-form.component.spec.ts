import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleFormComponent } from './new-article-form.component';

describe('NewArticleFormComponent', () => {
  let component: NewArticleFormComponent;
  let fixture: ComponentFixture<NewArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArticleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
