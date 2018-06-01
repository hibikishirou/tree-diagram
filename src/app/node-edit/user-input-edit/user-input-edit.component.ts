import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'user-input-edit',
  templateUrl: './user-input-edit.component.html',
  styleUrls: ['./user-input-edit.component.scss']
})
export class UserInputEditComponent implements OnInit {

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
  saveEditNode() {
    if(this.showEditingNode.children.length==0){
      this.showEditingNode.children.push(new Default("Ok"));
      this.showEditingNode.children.push(new Default("No input"));
      this.showEditingNode.children.push(new Default("Wrong input"));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
