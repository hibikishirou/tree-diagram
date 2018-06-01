import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Default, Menu } from '../../node-model/node';
@Component({
  selector: 'menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit, OnChanges {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode:Menu;
  private buttons;

  constructor() {
    this.buttons = [{
      'active': false,
      'value': '1',
      'index': 1
    }, {
      'active': false,
      'value': '2',
      'index': 2
    }, {
      'active': false,
      'value': '3',
      'index': 3
    }, {
      'active': false,
      'value': '4',
      'index': 4
    }, {
      'active': false,
      'value': '5',
      'index': 5
    }, {
      'active': false,
      'value': '6',
      'index': 6
    }, {
      'active': false,
      'value': '7',
      'index': 7
    }, {
      'active': false,
      'value': '8',
      'index': 8
    }, {
      'active': false,
      'value': '9',
      'index': 9
    }, {
      'active': false,
      'value': '#',
      'index': 10
    }, {
      'active': false,
      'value': '0',
      'index': 11
    }, {
      'active': false,
      'value': '*',
      'index': 12
    }];
    this.showEditingNode = new Menu();
  }

  ngOnInit() {
    this.showEditingNode = new Menu();
  }

  ngOnChanges(): void {
    for (let button of this.buttons) {
      button.active = false;
    }
    this.showEditingNode = JSON.parse(JSON.stringify(this.editingNode));
    if(this.showEditingNode.children.length > 0) {
      for (let child of this.showEditingNode.children) {
        for (let button of this.buttons) {
          if (child.name == button.value) {
            button.active = true;
          }
        }
      } 
    }
  }
  selectButton(button) {
    button.active = !button.active;
  }
  cancelEditNode() {
    this.onCancelEdit.emit();
  }
  
  validation(){
    let result = true;
    if(!this.showEditingNode.required.mediafile) {
      result = false;
    }
    this.showEditingNode.valid = result;
  }

  saveEditNode() {
    this.validation();
    if(this.showEditingNode.children.length == 0) {
      this.showEditingNode.children.push(new Default('Timeout', 13));
      this.showEditingNode.children.push(new Default('Fail', 14));
    }
    for (let button of this.buttons) {
      if (button.active) {
        let result = false;
        if(this.showEditingNode.children.length >0) {
          for (let child of this.showEditingNode.children) {
            if (child.name == button.value && child.name != "Timeout" && child.name != "Fail") {
              result = true;
              break;
            }
          }
        } 
        if(!result) {
          this.showEditingNode.children.push(
            new Default(button.value, button.index)
          )
        }
      } else {
        let result = false;
        if(this.showEditingNode.children.length >0) {
          for (let i =0; i<this.showEditingNode.children.length; i++) {
            let child = this.showEditingNode.children[i];
            if (child.name == button.value) {
              this.showEditingNode.children.splice(i,1);
            }
          }
        } 
      }
    }
    this.sortButton(this.showEditingNode.children);

    this.onDoneEdit.emit(this.showEditingNode);
  }

  sortButton(list){
    for(let i=0; i < list.length-1; i++) {
      for(let j=i+1; j < list.length; j++) {
        if(list[i].index > list[j].index) {
          let temp = list[i];
          list[i] = list[j];
          list[j] = temp;
        }
      }
    }
  }
}
