import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Home } from '../../node-model/node'
@Component({
  selector: 'home-edit',
  templateUrl: './home-edit.component.html',
  styleUrls: ['./home-edit.component.scss']
})
export class HomeEditComponent implements OnInit {

  @Input()
  editingNode: any;

  @Output()
  onDoneEdit = new EventEmitter<{}>();

  @Output()
  onCancelEdit = new EventEmitter<{}>();
 
  private showEditingNode:Home;
  private listParameters = ["General","Record","Menu","User Input","Transfer", "SFCC", "Reroute", "Variables"];
  private listDigits = [];
  constructor() {
    this.listDigits = ["1","2","3","4","5","6","7","8","9","*","0","#"];
  }

  ngOnInit() {
    this.showEditingNode = new Home();
  }

  ngOnChanges(): void {
    this.showEditingNode = JSON.parse(JSON.stringify(this.editingNode));
  }

  cancelEditNode() {
    this.showEditingNode = JSON.parse(JSON.stringify(this.editingNode));
    this.onCancelEdit.emit();
  }
  saveEditNode() {
    this.onDoneEdit.emit(this.showEditingNode);
  }

  addVariable(){
    this.showEditingNode.settings.variables.push({
      index: this.showEditingNode.settings.variables.length + 1,
      variablename: '',
      value: ''
    });
  }

  removeVariable(variable){
    for(let i = 0 ; i < this.showEditingNode.settings.variables.length; i++){
      if(this.showEditingNode.settings.variables[i].index== variable.index) {
        this.showEditingNode.settings.variables.splice(i, 1);
        break;
      }
    }
  }
}
