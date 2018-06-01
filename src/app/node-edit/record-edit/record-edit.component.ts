import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.scss']
})
export class RecordEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listVariables = [];
  constructor() {
    this.listVariables = ["Please select", "1"];
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
      this.showEditingNode.children.push(new Default("Success"));
      this.showEditingNode.children.push(new Default("Fail"));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
