import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import {BlogComponent} from "./blog/blog.component";
import {DetailComponent} from "./detail/detail.component";
import {SharedModule} from "../../shared/shared.module";
import {CarouselModule} from "ngx-owl-carousel-o";
import {ReactiveFormsModule} from "@angular/forms";
import {CommentComponent} from "./comment/comment.component";


@NgModule({
  declarations: [
    BlogComponent,
    DetailComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CarouselModule,
    ReactiveFormsModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
