import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'reroute-edit',
  templateUrl: './reroute-edit.component.html',
  styleUrls: ['./reroute-edit.component.scss']
})
export class RerouteEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();

  private showEditingNode;

  private listParemeters = [];
  emptyRight = false;
  emptyLeft = false;

  constructor() {
  }

  ngOnInit() {
    this.listParemeters = ["1", "2", "3", "4", "5", "6", "7"];
    this.showEditingNode.optional.parameterstosubmit = [];
    this.checkEmpty();
  }

  ngOnChanges(): void {
    this.listParemeters = ["1", "2", "3", "4", "5", "6", "7"];
    this.showEditingNode = this.editingNode;
    this.checkEmpty();
  }

  cancelEditNode() {
    this.onCancelEdit.emit();
  }
  saveEditNode() {
    this.onDoneEdit.emit(this.showEditingNode);
  }
  checkEmpty() {
    if (!this.showEditingNode || !this.showEditingNode.optional || !this.showEditingNode.optional.parameterstosubmit || this.showEditingNode.optional.parameterstosubmit.length == 0) {
      this.emptyRight = true;
    } else {
      this.emptyRight = false;
    }
    if (!this.listParemeters || this.listParemeters.length == 0) {
      this.emptyLeft = true;
    } else {
      this.emptyLeft = false;
    }
  }
  goToLeft(listRight) {
    if(listRight){
      for (let i = 0; i < listRight.length; i++) {
        for (let j = 0; j < this.showEditingNode.optional.parameterstosubmit.length; j++) {
          if (listRight[i] == this.showEditingNode.optional.parameterstosubmit[j]) {
            this.showEditingNode.optional.parameterstosubmit.splice(j, 1);
            this.listParemeters.push(listRight[i]);
          }
        }
      }
      this.checkEmpty();
    }
  }
  goToRight(listLeft) {
    if(listLeft) {
      for (let i = 0; i < listLeft.length; i++) {
        for (let j = 0; j < this.listParemeters.length; j++) {
          if (listLeft[i] == this.listParemeters[j]) {
            this.listParemeters.splice(j, 1);
            if(!this.showEditingNode.optional.parameterstosubmit) {
              this.showEditingNode.optional.parameterstosubmit = [];
            }
            this.showEditingNode.optional.parameterstosubmit.push(listLeft[i]);
          }
        }
      }
      this.checkEmpty();
    }
  }

  goAllLeft() {
    for(let i = 0; i< this.showEditingNode.optional.parameterstosubmit.length; i++){
      this.listParemeters.push(this.showEditingNode.optional.parameterstosubmit[i]);
    }
    this.showEditingNode.optional.parameterstosubmit = [];
    this.checkEmpty();
  }

  goAllRight() {
    for(let i = 0; i< this.listParemeters.length; i++){
      if(!this.showEditingNode.optional.parameterstosubmit) {
        this.showEditingNode.optional.parameterstosubmit = [];
      }
      this.showEditingNode.optional.parameterstosubmit.push(this.listParemeters[i]);
    }
    this.listParemeters = [];
    this.checkEmpty();
  }
}
