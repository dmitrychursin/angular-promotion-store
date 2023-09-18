import {Component, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ActivatedRoute} from "@angular/router";
import {RelatedArticleType} from "../../../../types/related-article.type";
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  article!: ArticleType;
  relatedArticles: RelatedArticleType[] = [];

  constructor(private articleService: ArticlesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
        this.articleService.getArticle(params['url'])
          .subscribe((data: ArticleType) => {
            this.article = data;
          })
        this.articleService.getRelatedArticles(params['url'])
          .subscribe((data: RelatedArticleType[]) => {
            this.relatedArticles = data;
          })
      })
  }


}
