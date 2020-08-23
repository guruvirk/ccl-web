import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'processing-indicator',
  templateUrl: './processing-indicator.component.html',
  styleUrls: ['./processing-indicator.component.css']
})
export class ProcessingIndicatorComponent implements OnInit {

  @Input()
  inline = false;

  @Input()
  view = 'bars';

  type: string;

  constructor() { }

  ngOnInit() {
    this.type = `${this.inline ? 'inline' : 'cover'}-${this.view}`;
  }

}
