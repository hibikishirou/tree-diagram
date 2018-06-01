import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'end-edit',
  templateUrl: './end-edit.component.html',
  styleUrls: ['./end-edit.component.scss']
})
export class EndEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();

  private showEditingNode = {};
  private listClear = [];
  constructor() {
    this.listClear = ["Please select", "NORMAL", "NUMBER_BUSY",
     "NO_ANSWER", "NUMBER_UNOBTAINABLE", "NUMBER_CHANGED", 
     "OUT_OF_ORDER", "INCOMING_CALLS_BARRED", "CALL_REJECTED", 
     "CALL_FAILED", "CHANNEL_BUSY", "NO_CHANNELS", "CONGESTION",
      "BEARCAP_FAILED", "OTHER"]
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
    this.onDoneEdit.emit(this.showEditingNode);
  }

}
