import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentsType } from "../../../../types/comments.type";

@Component({
	selector: 'app-comment-card',
	templateUrl: './comment-card.component.html',
	styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent {

	@Input() comment!: CommentsType;

	@Input() liked = false;
	@Input() disliked = false;

	@Output() likeComment = new EventEmitter<void>();
	@Output() dislikeComment = new EventEmitter<void>();
	@Output() violateComment = new EventEmitter<void>();

	constructor() {
	}

	onLike() {
    this.likeComment.emit();
	}

	onDislike() {
    this.dislikeComment.emit();
	}

  onViolate() {
    this.violateComment.emit();
  }

}

