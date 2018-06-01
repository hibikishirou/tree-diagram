import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';
@Component({
  selector: 'dynamic-play-edit',
  templateUrl: './dynamic-play-edit.component.html',
  styleUrls: ['./dynamic-play-edit.component.scss']
})
export class DynamicPlayEditComponent implements OnInit {

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

  cancelEditNode() {
    this.onCancelEdit.emit();
  }

  validation() {
    let result = true;
    if(!this.showEditingNode.required.dynamicmedia) {
      result = false;
    }
    this.showEditingNode.valid = result;
  }
  saveEditNode() {
    this.validation();
    if(this.showEditingNode.children.length==0){
      this.showEditingNode.children.push(new Default("Active"));
      this.showEditingNode.children.push(new Default("Inactive"));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
