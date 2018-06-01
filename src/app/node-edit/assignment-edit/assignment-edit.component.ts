import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from "../../node-model/node";

@Component({
  selector: 'assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.scss']
})
export class AssignmentEditComponent implements OnInit {

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
  constructor() {
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        select1: "Please select",
        select2: "Please select",
        input: "",
        disabled: true
      }
      this.listItem.push(item);
    }
    this.listItem1 = ["Please select", "language", "callId", "cli", "tli", "rdnis", "Calling Number", "Service Number", "Redirecting Number"];
    this.listItem2 = ["Please select", "User value -->", "language", "callId", "cli", "tli", "rdnis", "Calling Number", "Service Number", "Redirecting Number"];
    
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.showEditingNode = this.editingNode;
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        select1: "Please select",
        select2: "Please select",
        input: ""
      }
      this.listItem[i].select1 = JSON.parse(JSON.stringify(item.select1));
      this.listItem[i].select2 = JSON.parse(JSON.stringify(item.select2));
      this.listItem[i].input = JSON.parse(JSON.stringify(item.input));
    }
    if(this.showEditingNode.required.length > 0){
      for(let item of this.showEditingNode.required) {
        for(let i = 0; i < 10;i++) {
          if(this.listItem[i].index == item.index) {
            this.listItem[i].select1 = JSON.parse(JSON.stringify(item.select1));
            this.listItem[i].select2 = JSON.parse(JSON.stringify(item.select2));
            this.listItem[i].input = JSON.parse(JSON.stringify(item.input));
          }
        }
      }
    } 
  }
  validation() {
    let result = true;
    for(let item of this.listItem) {
      if(item.select1 =="Please select") {
        if(item.select2 != "Please select") {
          result = false;
          break;
        }
      } else {
        if(item.select2 == "Please select" || item.select2 == item.select1) {
          result = false;
          break;
        }
      }
    }
    this.showEditingNode.valid = result;
  }
  validItem(item) {
    if(item.select1 !="Please select" && item.select2 !="Please select") {
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
    for(let i=0; i< this.listItem.length; i++){
      if(this.validItem(this.listItem[i])) {
        let result = false;
        for(let j = 0; j < this.showEditingNode.required.length; j++){
          if(this.showEditingNode.required[j].index == this.listItem[i].index) {
            this.showEditingNode.required[j] = this.listItem[i];
            result = true;
            break;
          } 
        }
        if(!result) {
          this.showEditingNode.required.push(this.listItem[i]);
        }
      } else {
        let result = false;
        if (this.listItem[i].select1 != "Please select" || this.listItem[i].select2 != "Please select") {
          for (let j = 0; j < this.showEditingNode.required.length; j++) {
            if (this.showEditingNode.required[j].index == this.listItem[i].index) {
              this.showEditingNode.required[j].select1 = this.listItem[i].select1;
              this.showEditingNode.required[j].select2 = this.listItem[i].select2;

              result = true;
              break;
            }
          }
        }
        if (!result) {
          this.showEditingNode.required.push(this.listItem[i]);
        }
        if (this.listItem[i].select1 == "Please select" && this.listItem[i].select2 == "Please select") {
          for (let j = 0; j < this.showEditingNode.required.length; j++) {
            if (this.showEditingNode.required[j].index == this.listItem[i].index) {
              this.showEditingNode.required.splice(j, 1);
            }
          }
        }
      }
    }
    if(this.showEditingNode.children.length == count){
      this.showEditingNode.children.push(new Default(null));
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
