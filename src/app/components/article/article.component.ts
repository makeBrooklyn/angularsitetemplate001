import { Component, inject, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArticleDetail } from '../../interfaces/ArticleDetail';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})

export class ArticleComponent {
  articlesService:ArticlesService= inject(ArticlesService);
  @Input({required: true})
  id:number = 0;
  @Input()
  segment?:string = undefined;
  @Input()
  showTitle:boolean = true;
  @Input()
  showSubTitle:boolean = true;
  @Input()
  showDate:boolean = true;


  articleDetail:ArticleDetail = this.articlesService.getArticleNotFound();
  

  constructor() {}
  
  ngOnInit(): void {
    this.getArticleDetail();
  }

  getArticleDetail() {
    this.articleDetail = this.articlesService.getArticleById(this.id);
  }
}