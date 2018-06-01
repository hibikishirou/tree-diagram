import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'time-edit',
  templateUrl: './time-edit.component.html',
  styleUrls: ['./time-edit.component.scss']
})
export class TimeEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();

  private showEditingNode;
  private listItem = [];
  private listHours = [];
  private listMinutes = [];
  constructor() {
    for (let i = 0; i < 10; i++) {
      let item = {
        index: i + 1,
        fromHour: "--",
        fromMinute: "--",
        toHour: "--",
        toMinute: "--"
      }
      this.listItem.push(item);
    }
    this.listHours = ["--", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09"]
    for (let i = 10; i < 24; i++) {
      this.listHours.push("" + i);
    }
    this.listMinutes = ["--", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09"];
    for (let i = 10; i < 60; i++) {
      this.listMinutes.push("" + i);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    for (let i = 0; i < 10; i++) {
      let item = {
        index: i + 1,
        fromHour: "--",
        fromMinute: "--",
        toHour: "--",
        toMinute: "--"
      }
      this.listItem[i].fromHour = JSON.parse(JSON.stringify(item.fromHour));
      this.listItem[i].fromMinute = JSON.parse(JSON.stringify(item.fromMinute));
      this.listItem[i].toHour = JSON.parse(JSON.stringify(item.toHour));
      this.listItem[i].toMinute = JSON.parse(JSON.stringify(item.toMinute));
    }
    this.showEditingNode = this.editingNode;
    if (this.showEditingNode.required.length > 0) {
      for (let item of this.showEditingNode.required) {
        for (let i = 0; i < 10; i++) {
          if (this.listItem[i].index == item.index) {
            this.listItem[i].fromHour = JSON.parse(JSON.stringify(item.fromHour));
            this.listItem[i].fromMinute = JSON.parse(JSON.stringify(item.fromMinute));
            this.listItem[i].toHour = JSON.parse(JSON.stringify(item.toHour));
            this.listItem[i].toMinute = JSON.parse(JSON.stringify(item.toMinute));
          } 
        }
      }
    }
  }
  validation() {
    let result = true;
    for (let i = 0; i < 10; i++) {
      if (this.listItem[i].fromHour != "--" && this.listItem[i].fromMinute == "--") {
        this.listItem[i].fromMinute = "00";
      }
      if (this.listItem[i].toHour != "--" && this.listItem[i].toMinute == "--") {
        this.listItem[i].toMinute = "00";
      }

      if (this.listItem[i].fromHour == "--") {
        if (this.listItem[i].fromMinute != "--" || this.listItem[i].toHour != "--" || this.listItem[i].toMinute != "--") {
          result = false;
        }
      } else {
        if (!this.validItem(this.listItem[i])) {
          result = false;
        }
      }
    }
    this.showEditingNode.valid = result;
  }
  validItem(item) {
    if (item.fromHour != "--" && item.fromMinute != "--" && item.toHour != "--" && item.toMinute != "--") {
      let timeFrom = item.fromHour + ":" + item.fromMinute;
      let timeTo = item.toHour + ":" + item.toMinute;
      if (timeFrom.localeCompare(timeTo) <= 0)
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
    for (let i = 0; i < 10; i++) {
      if (this.validItem(this.listItem[i])) {
        let result = false;
        for (let j = 0; j < this.showEditingNode.children.length; j++) {
          if (this.showEditingNode.children[j].index == this.listItem[i].index) {
            let name = this.listItem[i].fromHour + ":" + this.listItem[i].fromMinute + "-" + this.listItem[i].toHour + ":" + this.listItem[i].toMinute;
            this.showEditingNode.children[j].name = (JSON.parse(JSON.stringify(name)));
            this.showEditingNode.required[j].fromHour = this.listItem[i].fromHour;
            this.showEditingNode.required[j].fromMinute = this.listItem[i].fromMinute;
            this.showEditingNode.required[j].toHour = this.listItem[i].toHour;
            this.showEditingNode.required[j].toMinute = this.listItem[i].toMinute;

            result = true;
            break;
          }
        }
        if (!result) {
          let name = this.listItem[i].fromHour + ":" + this.listItem[i].fromMinute + "-" + this.listItem[i].toHour + ":" + this.listItem[i].toMinute;
          this.showEditingNode.children.push(new Default(name, this.listItem[i].index));
          this.showEditingNode.required.push(this.listItem[i]);
        }
        count++;
      } else {
        let result = false;
        if (this.listItem[i].fromHour != "--" || this.listItem[i].fromMinute != "--" || this.listItem[i].toHour != "--" || this.listItem[i].toMinute != "--") {
          for (let j = 0; j < this.showEditingNode.children.length; j++) {
            if (this.showEditingNode.children[j].index == this.listItem[i].index) {
              this.showEditingNode.required[j].fromHour = this.listItem[i].fromHour;
              this.showEditingNode.required[j].fromMinute = this.listItem[i].fromMinute;
              this.showEditingNode.required[j].toHour = this.listItem[i].toHour;
              this.showEditingNode.required[j].toMinute = this.listItem[i].toMinute;
              this.showEditingNode.children.splice(j, 1);

              result = true;
              break;
            }
          }
        }
        if (!result) {
          this.showEditingNode.required.push(this.listItem[i]);
        }
        if (this.listItem[i].fromHour == "--" && this.listItem[i].fromMinute == "--" && this.listItem[i].toHour == "--" && this.listItem[i].toMinute == "--") {
          for (let j = 0; j < this.showEditingNode.children.length; j++) {
            if (this.showEditingNode.children[j].index == this.listItem[i].index) {
              this.showEditingNode.children.splice(j, 1);
              this.showEditingNode.required.splice(j, 1);
            }
          }
        }
      }
    }
    this.sortButton(this.showEditingNode.children);
    if (this.showEditingNode.children.length == count) {
      this.showEditingNode.children.push(new Default("Else", 11));
    }
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
