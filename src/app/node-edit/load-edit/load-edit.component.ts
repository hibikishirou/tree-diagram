import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'load-edit',
  templateUrl: './load-edit.component.html',
  styleUrls: ['./load-edit.component.scss']
})
export class LoadEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listItem = [];
  constructor() {
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        value: null,
      }
      this.listItem.push(item);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        value: null,
      }
      this.listItem[i].value = JSON.parse(JSON.stringify(item.value));
    }
    this.showEditingNode = this.editingNode;
    if(this.showEditingNode.required.length > 0) {
      for(let item of this.showEditingNode.required) {
        for(let i = 0; i < 10;i++) {
          if(this.listItem[i].index == item.index) {
            this.listItem[i].value = JSON.parse(JSON.stringify(item.value));
          }
        }
      }
    }
  }
  validation() {
    let result = true;
    let count = 0;
    for(let item of this.listItem) {
      if(item.value) {
        count += item.value;
      }
    }
    if(count != 100) {
      result = false;
    }
    this.showEditingNode.valid = result;
  }

  validItem(item) {
    if(item.value && item.value > 0) 
      return true;
    return false;
  }
  cancelEditNode() {
    this.onCancelEdit.emit();
  }
  saveEditNode() {
    this.validation();
    let count = 0;
    for(let i = 0; i < 10; i++){
      if(this.validItem(this.listItem[i])) {
        let result = false;
        for(let j = 0; j < this.showEditingNode.children.length; j++){
          if(this.showEditingNode.children[j].index == this.listItem[i].index) {
            this.showEditingNode.children[j].name = (JSON.parse(JSON.stringify( this.listItem[i].value+"%")));
            this.showEditingNode.required[j].value = this.listItem[i].value;
            result = true;
            break;
          } 
        }
        if(!result) {
          this.showEditingNode.children.push(new Default(this.listItem[i].value+"%", this.listItem[i].index));  
          this.showEditingNode.required.push(this.listItem[i]);
        }
        count++;
      } else {
        for(let j = 0; j < this.showEditingNode.children.length; j++){
          if(this.showEditingNode.children[j].index == this.listItem[i].index) {
            this.showEditingNode.children.splice(j,1);
            this.showEditingNode.required.splice(j,1);
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
