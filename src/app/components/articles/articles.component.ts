import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ArticleListItem } from '../../interfaces/ArticleListItem';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articlesService:ArticlesService= inject(ArticlesService);
  articleList:ArticleListItem[] = [];
  articleCount:number = 0;

  @Input()
  typeFilter:string = '';
  @Input({required: true})
  segment:string = "";

  constructor() {}

  ngOnInit() {
    if(this.segment > "") {
      this.segment = this.segment ;
    }

    this.articleList = this.articlesService.getArticleByType(this.typeFilter);
    this.articleCount = this.articleList.length;
  }

}
