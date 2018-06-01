import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from "../../node-model/node";
@Component({
  selector: 'date-edit',
  templateUrl: './date-edit.component.html',
  styleUrls: ['./date-edit.component.scss']
})
export class DateEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listItem = [];
  private listDays = [];
  private listMonths = [];
  private listYears = [];
  constructor() {
    for(let i = 0; i < 10;i++) {
      let item = {
        index: i+1,
        day: "--",
        month: "--",
        year: "--",
      }
      this.listItem.push(item);
    }

    this.listDays = ["--", "01", "02", "03", "04", "05","06","07","08","09"]
    for(let i = 10; i < 32; i++) {
      this.listDays.push(""+i);
    } 

    this.listMonths = ["--", "01", "02", "03", "04", "05","06","07","08","09"];
    for(let i = 10; i < 13; i++) {
      this.listMonths.push(""+i);
    } 

    this.listYears = ["--", "Each year"];
    for(let i = 2010; i < 2021; i++) {
      this.listYears.push(""+i);
    } 
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    for (let i = 0; i < 10; i++) {
      let item = {
        index: i+1,
        day: "--",
        month: "--",
        year: "--",
      }
      this.listItem[i].day = JSON.parse(JSON.stringify(item.day));
      this.listItem[i].month = JSON.parse(JSON.stringify(item.month));
      this.listItem[i].year = JSON.parse(JSON.stringify(item.year));
    }
    this.showEditingNode = this.editingNode;
    if (this.showEditingNode.required.length > 0) {
      for (let item of this.showEditingNode.required) {
        for (let i = 0; i < 10; i++) {
          if (this.listItem[i].index == item.index) {
            this.listItem[i].day = JSON.parse(JSON.stringify(item.day));
            this.listItem[i].month = JSON.parse(JSON.stringify(item.month));
            this.listItem[i].year = JSON.parse(JSON.stringify(item.year));
          } 
        }
      }
    } 
  }
  validation() {
    let result = true;
    for(let item of this.listItem){
      if(item.day =="--") {
        if(item.month !="--" || item.year !="--") {
          result =false;
          break;
        }
      } else {
        if(!this.validItem(item)) {
          result = false;
          break;
        }
      }
    }
    this.showEditingNode.valid = result;
  }
  validItem(item) {
    if(item.day !="--" && item.month !="--" && item.year !="--") {
      if(item.year !="Each year") {

        let now = new Date();
        let select = new Date(item.year, item.month, item.day);
        if (now < select)
          return true;
      } else {
        return true;
      }
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
            this.showEditingNode.required[j].value = this.listItem[i].value;
            result = true;
            break;
          } 
        }
        if(!result) {
          this.showEditingNode.required.push(this.listItem[i]);
        }
      } else {
        let result = false;
        if (this.listItem[i].day != "--" || this.listItem[i].month != "--" || this.listItem[i].year != "--") {
          for (let j = 0; j < this.showEditingNode.required.length; j++) {
            if (this.showEditingNode.required[j].index == this.listItem[i].index) {
              this.showEditingNode.required[j].day = this.listItem[i].day;
              this.showEditingNode.required[j].month = this.listItem[i].month;
              this.showEditingNode.required[j].year = this.listItem[i].year;

              result = true;
              break;
            }
          }
        }
        if (!result) {
          this.showEditingNode.required.push(this.listItem[i]);
        }
        if (this.listItem[i].day == "--" && this.listItem[i].month == "--" && this.listItem[i].year == "--") {
          for (let j = 0; j < this.showEditingNode.required.length; j++) {
            if (this.showEditingNode.required[j].index == this.listItem[i].index) {
              this.showEditingNode.required.splice(j, 1);
            }
          }
        }
      }
    }
    if(this.showEditingNode.children.length == count){
      this.showEditingNode.children.push(new Default("Match"));
      this.showEditingNode.children.push(new Default("Else"));
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
