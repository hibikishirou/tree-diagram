import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from "../../node-model/node";

@Component({
  selector: 'sfcc-edit',
  templateUrl: './sfcc-edit.component.html',
  styleUrls: ['./sfcc-edit.component.scss']
})
export class SfccEditComponent implements OnInit {

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
    let result = false;
    if(this.showEditingNode.required.campaign) {
      result = true;
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
