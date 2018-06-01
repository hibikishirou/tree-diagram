import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';
@Component({
  selector: 'url-play-edit',
  templateUrl: './url-play-edit.component.html',
  styleUrls: ['./url-play-edit.component.scss']
})
export class UrlPlayEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listUrltoPlay;
  constructor() {
    this.listUrltoPlay = ["Please select", "1"];
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
    if(this.showEditingNode.required.urltoplay == "Please select") {
      result = false;
    }
    this.showEditingNode.valid = result;
  }

  saveEditNode() {
    this.validation();
    if(this.showEditingNode.children.length==0){
      this.showEditingNode.children.push(new Default(null));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
