import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {LoaderComponent} from './components/loader/loader.component';
import {SliderSharesComponent} from './components/slider-shares/slider-shares.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {BlogCardComponent} from './components/blog-card/blog-card.component';
import {FooterPopupComponent} from './components/footer-popup/footer-popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ServicesPopupComponent} from './components/services-popup/services-popup.component';
import {CommentCardComponent} from './components/comment-card/comment-card.component';
import {RestrictionTextPipe} from './components/pipe/restriction-text.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    SliderSharesComponent,
    BlogCardComponent,
    FooterPopupComponent,
    ServicesPopupComponent,
    CommentCardComponent,
    RestrictionTextPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoaderComponent,
    SliderSharesComponent,
    BlogCardComponent,
    CommentCardComponent,
    RestrictionTextPipe
  ]
})
export class SharedModule {
}
