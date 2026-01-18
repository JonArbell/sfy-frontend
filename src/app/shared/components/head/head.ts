import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-head',
  imports: [],
  templateUrl: './head.html'
})
export class Head implements OnChanges{

  @Input() title : string = 'Shortify - log in or sign up';
  @Input() description : string = '';
  @Input() keywords : string = '';
  constructor(private titleService: Title, private meta: Meta) {}


  ngOnChanges(changes: SimpleChanges): void {

    if(changes['title'])
      this.titleService.setTitle(this.title);

    if (changes['description']) {
      this.meta.updateTag({ name: 'description', content: this.description });
    }

    if (changes['keywords']) {
      this.meta.updateTag({ name: 'keywords', content: this.keywords });
    }

  }

}
