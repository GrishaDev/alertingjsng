import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';


// animations: [
//   trigger('EnterLeave', [
//     state('flyIn', style({ transform: 'translateX(0)' })),
//     transition(':enter', [
//       style({ transform: 'translateX(-6000%)' }),
//       animate('0.5s 300ms ease-in')
//     ]),
//     transition(':leave', [
//       animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
//     ])
//   ])
// ]



@Component({
  selector: 'app-testingarea',
  templateUrl: './testingarea.component.html',
  styleUrls: ['./testingarea.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
      animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class TestingareaComponent implements OnInit {

  constructor() 
  { 
    
  }

  items = Array.from({length: 100}).map((_, i) => `Item #${i}`);

  test;

  visible = false;
  currentState = 'initial';

  color = 'primary';
  mode = 'determinate';
  value = 50;

  ngOnInit() 
  {
    this.visible = true;
    //this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
   // this.visible = true;
    console.log("hey"); 
  }



  
listItem = [];
list_order: number = 1;
addItem() {
  var listitem = "ListItem " + this.list_order;
  this.list_order++;
  this.listItem.push(listitem);
}
removeItem() {
  this.listItem.length -= 1;
}


 // currentState = 'initial';
changeState() {
  
  //this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  //this.test = this.test === 'flyIn';
}
}
