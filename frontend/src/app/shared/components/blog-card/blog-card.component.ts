import {Component, Input} from '@angular/core';
import {ArticlesType} from "../../../../types/articles.type";

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input() article!: ArticlesType

  constructor() {
  }


}
