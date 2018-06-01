import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Default } from '../../node-model/node';
@Component({
  selector: 'transfer-edit',
  templateUrl: './transfer-edit.component.html',
  styleUrls: ['./transfer-edit.component.scss']
})
export class TransferEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode;
  private numberTransfer = [];
  private listTliNumberPlan = [];
  private listTliNumberFormat = [];
  private listTliNumberScreening = [];
  private listCliNumberPlan = [];
  private listCliNumberFormat = [];
  private listCliNumberScreening = [];
  private listCliNumberPresentation = [];

  constructor() {
    this.numberTransfer = ["Please select", "1"];
    this.listTliNumberPlan = ["A-leg", "1"];
    this.listTliNumberFormat = ["A-leg", "1"];
    this.listTliNumberScreening = ["A-leg", "1"];
    this.listCliNumberPlan = ["A-leg", "1"];
    this.listCliNumberFormat = ["A-leg", "1"];
    this.listCliNumberScreening = ["A-leg", "1"];
    this.listCliNumberPresentation = ["A-leg", "1"];
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
    if(this.showEditingNode.required.numbertotransfer == "Please select") {
      result = false;
    }
    this.showEditingNode.valid = result;
  }
  saveEditNode() {
    this.validation();
    if(this.showEditingNode.children.length==0){
      this.showEditingNode.children.push(new Default("Success"));
      this.showEditingNode.children.push(new Default("Fail"));
      this.showEditingNode.children.push(new Default("No Answer"));
      this.showEditingNode.children.push(new Default("Busy"));
    }
    this.onDoneEdit.emit(this.showEditingNode);
  }
}
