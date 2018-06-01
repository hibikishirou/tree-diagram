import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';

@Component({
  selector: 'web-service-edit',
  templateUrl: './web-service-edit.component.html',
  styleUrls: ['./web-service-edit.component.scss']
})
export class WebServiceEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listMethod = [];
  constructor() {
    this.listMethod = ["HTTP get", "HTTP post"];
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
    if(!this.showEditingNode.required.url) {
      result = false;
    }

    this.showEditingNode.valid = result;
  }
  saveEditNode() {
    this.validation();
    if(this.showEditingNode.children.length==0){
      this.showEditingNode.children.push(new Default());
      this.showEditingNode.children.push(new Default("Success"));
      this.showEditingNode.children.push(new Default("Fail"));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
