import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from "../../node-model/node";

@Component({
  selector: 'ccxml-exit-edit',
  templateUrl: './ccxml-exit-edit.component.html',
  styleUrls: ['./ccxml-exit-edit.component.scss']
})
export class CcxmlExitEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.showEditingNode = this.editingNode;
  }
  validation() {
    let result = true;
    if(!this.showEditingNode.required.exitapplicationurl) {
      result = false;
    }
    if(!this.showEditingNode.required.destination) {
      result = false;
    }
    this.showEditingNode.valid = result;
  }
  cancelEditNode() {
    this.onCancelEdit.emit();
  }
  saveEditNode() {
    this.validation();
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
