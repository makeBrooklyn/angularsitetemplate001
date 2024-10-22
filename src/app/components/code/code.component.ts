import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetail } from '../../interfaces/ArticleDetail';
import { ArticleComponent } from "../article/article.component";
import { ArticlesComponent } from '../articles/articles.component';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [ArticlesComponent, ArticleComponent, CommonModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  id:number = 0;
  constructor (private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }


}
