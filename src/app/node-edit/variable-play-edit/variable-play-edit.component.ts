import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';
@Component({
  selector: 'variable-play-edit',
  templateUrl: './variable-play-edit.component.html',
  styleUrls: ['./variable-play-edit.component.scss']
})
export class VariablePlayEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private listPlay = [];
  private listType = [];
  constructor() {
    this.listPlay = ["Please select", "1" ];
    this.listType = ["Please select", "2"];
    
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.showEditingNode = this.editingNode;
  }

  cancelEditNode() {
    this.onCancelEdit.emit();
  }

  validation(){
    let result = false;
    if(this.showEditingNode.required.variabletoplay != 'Please select' &&  this.showEditingNode.required.typeofvariable!= 'Please select') {
      result = true;
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
