import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from "../../node-model/node";
@Component({
  selector: 'day-of-week-edit',
  templateUrl: './day-of-week-edit.component.html',
  styleUrls: ['./day-of-week-edit.component.scss']
})
export class DayOfWeekEditComponent implements OnInit {

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
    for (let i = 0; i < 7; i++) {
      let item = {
        index: i + 1,
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
      }
      this.listItem.push(item);
    }

    this.listDays = [{
      'value': "Mo",
      'active': false,
      'index': 1
    }, {
      'value': "Tu",
      'active': false,
      'index': 2
    }, {
      'value': "We",
      'active': false,
      'index': 3
    }, {
      'value': "Th",
      'active': false,
      'index': 4
    }, {
      'value': "Fr",
      'active': false,
      'index': 5
    }, {
      'value': "Sa",
      'active': false,
      'index': 6
    }, {
      'value': "Su",
      'active': false,
      'index': 7
    }];

  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    for (let i = 0; i < 7; i++) {
      let item = {
        index: i + 1,
        Mo: false,
        Tu: false,
        We: false,
        Th: false,
        Fr: false,
        Sa: false,
        Su: false
      }
      this.listItem[i] = item;
    }
    this.showEditingNode = this.editingNode;
    if (this.showEditingNode.required.length > 0) {
      for (let i = 0; i < this.showEditingNode.required.length; i++) {
        for (let j = 0; j < 7; j++) {
          if (this.listItem[j].index == this.showEditingNode.required[i].index) {
            this.listItem[j] = this.showEditingNode.required[i];
          }
        }
      }
    }
  }
  validation() {
    let result = true;
    let count = [];
    for(let i = 0; i < 7; i++) {
      count[i]=0;
    }
    for(let item of this.listItem) {
      if(item.Mo) {
        count[0]++;
      } 
      if(item.Tu) {
        count[1]++;
      }
      if(item.We) {
        count[2]++;
      }
      if(item.Th) {
        count[3]++;
      }
      if(item.Fr) {
        count[4]++;
      }
      if(item.Sa) {
        count[5]++;
      }
      if(item.Su) {
        count[6]++;
      }
    }
    let day = 0;
    for(let i = 0; i< 7; i++){
      if(count[i]>1) {
        result = false;
      } else {
        if(count[i]==1) {
          day++;
        }
      }
    }
    if(day != 7) {
      result = false;
    } 
    this.showEditingNode.valid = result;
  }
  validItem(item) {
    if (item.Mo || item.Tu || item.We || item.Th || item.Fr || item.Sa || item.Su) {
      return true;
    }
    return false;
  }

  selectButton(day, item) {
    item[day.value] = !item[day.value];
  }

  cancelEditNode() {
    this.onCancelEdit.emit();
  }
  saveEditNode() {
    this.validation();
    let count = 0;
    for (let i = 0; i < 7; i++) {
      if (this.validItem(this.listItem[i])) {
        let result = false;
        for (let j = 0; j < this.showEditingNode.children.length; j++) {
          if (this.showEditingNode.children[j].index == this.listItem[i].index) {
            this.showEditingNode.required[j] = this.listItem[i];
            result = true;
            break;
          }
        }
        if (!result) {
          this.showEditingNode.children.push(new Default("" + (this.listItem[i].index), this.listItem[i].index));
          this.showEditingNode.required.push(this.listItem[i]);
        }
        count++;
      } else {
        for (let j = 0; j < this.showEditingNode.children.length; j++) {
          if (this.showEditingNode.children[j].index == this.listItem[i].index) {
            this.showEditingNode.children.splice(j, 1);
            this.showEditingNode.required.splice(j, 1);
          }
        }
      }
    }
    this.sortButton(this.showEditingNode.children);
    this.onDoneEdit.emit(this.showEditingNode);
  }

  sortButton(list) {
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (list[i].index > list[j].index) {
          let temp = list[i];
          list[i] = list[j];
          list[j] = temp;
        }
      }
    }
  }
}
