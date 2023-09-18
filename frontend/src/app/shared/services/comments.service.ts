import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionType} from "../../../types/comment-action.type";
import {AddCommentType} from "../../../types/add-comment.type";
import {AllCommentType} from "../../../types/all-comment.type";
import {ActionType} from "../../../types/action.type";


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getComments(id: string, offset: number ): Observable<AllCommentType | DefaultResponseType> {
    return this.http.get<AllCommentType | DefaultResponseType>(environment.api + "comments/?offset=" + offset + "&article=" + id);
  }

  addComment(params: AddCommentType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + "comments", params);
  }

  addCommentAction(url: string, param: ActionType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + "comments/" + url, param);
  }

  getActionsForComment(id: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + "comments/" + id + "/actions");
  }

  getArticleCommentsActions(id: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + "comments/article-comment-actions?articleId=" + id);
  }


}
