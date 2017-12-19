import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-mt',
  templateUrl: './input-mt.component.html',
  styleUrls: ['./input-mt.component.css']
})
export class InputMtComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() controlName: string;
  @Input() types: string[];
  constructor() { }

  ngOnInit() {
    console.log('La');
  }
}
