import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'if-edit',
  templateUrl: './if-edit.component.html',
  styleUrls: ['./if-edit.component.scss']
})
export class IfEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listItem = [];
  private listItem1 = [];
  private listItem2 = [];
  private listItem3 = [];
  constructor() {
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        select1: "Please select",
        select2: "",
        select3: "Please select",
        input: ""
      }
      this.listItem.push(item);
    }
    this.listItem1 = ["Please select", "language", "callId", "cli", "tli", "rdnis", "Calling Number", "Service Number", "Redirecting Number"];
    this.listItem2 = ["", "==", ">=", "<=", ">", "<", "!="];
    this.listItem3 = ["Please select", "User value -->", "language", "callId", "cli", "tli", "rdnis", "Calling Number", "Service Number", "Redirecting Number"];
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    for(let i=0; i<10; i++){
      let item = {
        index: i+1,
        select1: "Please select",
        select2: "",
        select3: "Please select",
        input: ""
      }
      this.listItem[i].select1 = JSON.parse(JSON.stringify(item.select1));
      this.listItem[i].select2 = JSON.parse(JSON.stringify(item.select2));
      this.listItem[i].select3 = JSON.parse(JSON.stringify(item.select3));
      this.listItem[i].input = JSON.parse(JSON.stringify(item.input));
    }
    this.showEditingNode = this.editingNode;
    if(this.showEditingNode.required.length > 0){
      for(let item of this.showEditingNode.required) {
        for(let i=0; i<10; i++){
          if(item.index == this.listItem[i].index) {
            this.listItem[i].select1 = JSON.parse(JSON.stringify(item.select1));
            this.listItem[i].select2 = JSON.parse(JSON.stringify(item.select2));
            this.listItem[i].select3 = JSON.parse(JSON.stringify(item.select3));
            this.listItem[i].input = JSON.parse(JSON.stringify(item.input));
          }
        }
      }
    } 
  }
  validation() {
    let result = true;
    let count = 0;
    for(let item of this.listItem){
      if(item.select1 == "Please select") {
        if(item.select2 !="" || item.select3 !="Please select")  {
          result = false;
          break;
        }
      } else {
        count++;
        if(item.select2 == " ") {
          result = false;
          break;
        }
        if(item.select3 == "Please select" || item.select3 == item.select1) {
          result = false;
          break;
        }
      }
    }
    if(count == 0) {
      result = false;
    }
    this.showEditingNode.valid = result;
  }

  validItem(item) {
    if(item.select1 != "Please select") {
      return true;
    } 
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
            this.showEditingNode.required[j].select1 = this.listItem[i].select1;
            this.showEditingNode.required[j].select2 = this.listItem[i].select2;
            this.showEditingNode.required[j].select3 = this.listItem[i].select3;
            this.showEditingNode.required[j].input = this.listItem[i].input;
            result = true;
            break;
          } 
        }
        if(!result) {
          this.showEditingNode.children.push(new Default(""+(this.listItem[i].index), this.listItem[i].index));  
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
    if(this.showEditingNode.children.length == count){
      this.showEditingNode.children.push(new Default("Else", 11));
    }
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
