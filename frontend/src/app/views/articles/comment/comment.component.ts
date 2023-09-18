import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {ArticleType} from "../../../../types/article.type";
import {CommentsService} from "../../../shared/services/comments.service";
import {CommentsType} from "../../../../types/comments.type";
import {FormBuilder} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {AddCommentType} from "../../../../types/add-comment.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentActionType} from "../../../../types/comment-action.type";
import {AllCommentType} from "../../../../types/all-comment.type";
import {ArticlesService} from "../../../shared/services/articles.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit, OnChanges {

  @Input() articleId!: ArticleType;
  @Input() articleComments!: CommentsType[];

  commentsActions: CommentActionType[];
  comment!: CommentsType;

  isLogged: boolean = false;

  offset: number = 3;
  allComments!: AllCommentType;
  allCommentsCount!: number;
  loadCommentsButton: boolean = true;

  actions: CommentActionType;

  liked = false;
  disliked = false;

  commentForm = this.fb.group({
    text: [''],
  });

  constructor(private authService: AuthService,
              private commentsService: CommentsService,
              private _snackBar: MatSnackBar,
              private articleService: ArticlesService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
    this.isLogged = this.authService.getIsLoggedIn();
    this.actions = {comment: '', action: ''};
    this.commentsActions = [{comment: '', action: ''}];
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getArticleCommentsActions();
  }

  ngOnInit() {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });


    this.commentsService.getComments(this.articleId.id, 0)
      .subscribe((comments: DefaultResponseType | AllCommentType) => {
        this.allComments = comments as AllCommentType;
        this.allCommentsCount = this.allComments.allCount;
      });
  }

  addComment() {
    const paramsObject: AddCommentType = {
      text: '',
      article: this.articleId.id
    };

    if (this.commentForm.value.text) {
      paramsObject.text = this.commentForm.value.text;
      this.commentsService.addComment(paramsObject)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this._snackBar.open('Комментарий успешно добавлен');
            this.getComments(this.articleId.id);
            this.commentForm.reset();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка отправки комментария');
            }
          }
        })
    } else {
      this._snackBar.open('Напишите комментарий');
    }
  }

  getComments(id: string, offset: number = 0, sort: boolean = false) {
    this.commentsService.getComments(id, offset)
      .subscribe((comments: DefaultResponseType | AllCommentType) => {
        this.allComments = comments as AllCommentType;
        if (sort) {
          this.articleComments = [...this.articleComments, ...this.allComments.comments];
        } else {
         this.articleComments = this.allComments.comments;
        }
        this.allCommentsCount = this.allComments.allCount;
        const limit = offset + 10 >= this.allCommentsCount;
        this.loadCommentsButton = !limit;
        this.offset = limit ? offset : offset + 10;

      })
  }

  addCommentCard() {
      this.getComments(this.articleId.id, this.offset, true);
  }

  // --------------------- like and dislike функционал ---------------------

  getArticleCommentsActions() {
    this.commentsService.getArticleCommentsActions(this.articleId.id)
      .subscribe((actions: CommentActionType[] | DefaultResponseType) => {
        this.commentsActions = actions as CommentActionType[];
      })
  }

  public handleLikeComment(id: string): void {
    if (this.authService.getIsLoggedIn()) {
      this.addAction('like', id);
    } else {
      this._snackBar.open('Нужно авторизоваться');
    }
  }

  public handleDislikeComment(id: string): void {
    if (this.authService.getIsLoggedIn()) {
      this.addAction('dislike', id);
    } else {
      this._snackBar.open('Нужно авторизоваться');
    }
  }

  public handleViolateComment(id: string): void {
    if (this.authService.getIsLoggedIn()) {
      const url: string = id + '/apply-action';
      const params = {
        action: 'violate',
      }
      this.commentsService.addCommentAction(url, params)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              throw new Error(data.message);
            }
            this._snackBar.open('Вы оставили жалобу');
          },
          error: () => {
            this._snackBar.open('Вы уже оставили жалобу');
          }
        })
    } else {
      this._snackBar.open('Нужно авторизоваться');
    }
  }

  addAction(action: string, id: string) {
    const url: string = id + '/apply-action';
    const params = {
      action: action,
    }
    this.commentsService.addCommentAction(url, params).subscribe(() => {
      switch (action) {
        case 'like': {
          if (this.liked) {
            this.liked = false;
            this._snackBar.open('Вы убрали свой лайк');
          } else {
            this.liked = true;
            this.disliked = false;
            this._snackBar.open('Вы поставили лайк');
          }
          break;
        }
        case 'dislike': {
          if (this.disliked) {
            this.disliked = false;
            this._snackBar.open('Вы убрали свой дизлайк');
          } else {
            this.disliked = true;
            this.liked = false;
            this._snackBar.open('Вы поставили дизлайк');
          }
          break;
        }
      }
      this.getCommentsAction(id);
      this.getArticleCommentsActions();
      this.getComments(this.articleId.id);

    })
  }

  getCommentsAction(id: string) {
    this.commentsService.getActionsForComment(id)
      .subscribe((actions: CommentActionType[] | DefaultResponseType) => {
        this.commentsActions = actions as CommentActionType[];
      })
  }

  isLiked(id: string): boolean {
    const foundActionLike = this.commentsActions.find((action: CommentActionType) => action.comment === id
      && action.action === 'like');
    return !!foundActionLike;
  }

  isDisliked(id: string): boolean {
    const foundActionDislike = this.commentsActions.find((action: CommentActionType) => action.comment === id
      && action.action === 'dislike');
    return !!foundActionDislike;
  }

  isViolated(id: string): boolean {
    const foundActionViolate = this.commentsActions.find((action: CommentActionType) => action.comment === id
      && action.action === 'violate');
    return !!foundActionViolate;
  }

}
