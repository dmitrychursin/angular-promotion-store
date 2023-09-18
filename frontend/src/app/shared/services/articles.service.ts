import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticlesType} from "../../../types/articles.type";
import {environment} from "../../../environments/environment";
import {RelatedArticleType} from "../../../types/related-article.type";
import {ArticleType} from "../../../types/article.type";
import {ActiveParamsType} from "../../../types/active.params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getArticles(params: ActiveParamsType): Observable<{ count: number, pages: number, items : ArticlesType[] }> {
    return this.http.get<{ count: number, pages: number, items : ArticlesType[]} >(environment.api + "articles", {
      params: params
    });
  }

  getPopularArticles(): Observable<ArticlesType[]> {
    return this.http.get<ArticlesType[]>(environment.api + "articles/top");
  }

  getArticle(url: string): Observable< ArticleType > {
    return this.http.get<ArticleType>(environment.api + "articles/" + url);
  }

  getRelatedArticles(url: string): Observable<RelatedArticleType[]> {
    return this.http.get<RelatedArticleType[]>(environment.api + "articles/related/" + url);
  }
}
