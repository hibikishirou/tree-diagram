import { Component, ViewChild } from '@angular/core';
import { TreeComponent, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { ContextMenuService, ContextMenuComponent } from 'angular2-contextmenu';

import {
  Default, Home,
  Play, VariablePlay, DynamicPlay, UrlPlay,
  Transfer, Menu, Record, WebService,
  If, Load, Time, Date,
  DayOfWeek, UserInput, Assignment, ConnectPrecall,
  SFCC, CCXMLExit, Reroute, End
} from './node-model/node';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('tree') tree: TreeComponent;
  @ViewChild('treelist') treelist: TreeComponent;

  @ViewChild('homemodal') homemodal: ModalDirective;
  @ViewChild('menumodal') menumodal: ModalDirective;
  @ViewChild('playmodal') playmodal: ModalDirective;
  @ViewChild('variableplaymodal') variableplaymodal: ModalDirective;
  @ViewChild('dynamicplaymodal') dynamicplaymodal: ModalDirective;
  @ViewChild('urlplaymodal') urlplaymodal: ModalDirective;
  @ViewChild('transfermodal') transfermodal: ModalDirective;
  @ViewChild('recordmodal') recordmodal: ModalDirective;
  @ViewChild('webservicemodal') webservicemodal: ModalDirective;
  @ViewChild('ifmodal') ifmodal: ModalDirective;
  @ViewChild('loadmodal') loadmodal: ModalDirective;
  @ViewChild('timemodal') timemodal: ModalDirective;
  @ViewChild('datemodal') datemodal: ModalDirective;
  @ViewChild('dayofweekmodal') dayofweekmodal: ModalDirective;
  @ViewChild('userinputmodal') userinputmodal: ModalDirective;
  @ViewChild('assignmentmodal') assignmentmodal: ModalDirective;
  @ViewChild('connectprecallmodal') connectprecallmodal: ModalDirective;
  @ViewChild('sfccmodal') sfccmodal: ModalDirective;
  @ViewChild('ccxmlexitmodal') ccxmlexitmodal: ModalDirective;
  @ViewChild('reroutemodal') reroutemodal: ModalDirective;
  @ViewChild('endmodal') endmodal: ModalDirective;

  @ViewChild('basicMenu') basicMenu: ContextMenuComponent;

  private showEditingHome = new Home();
  private showEditingMenu = new Menu();
  private showEditingPlay = new Play();
  private showEditingVariablePlay = new VariablePlay();
  private showEditingDynamicPlay = new DynamicPlay();
  private showEditingUrlPlay = new UrlPlay();
  private showEditingTransfer = new Transfer();
  private showEditingRecord = new Record();
  private showEditingWebService = new WebService();
  private showEditingIf = new If();
  private showEditingLoad = new Load();
  private showEditingTime = new Time();
  private showEditingDate = new Date();
  private showEditingDayOfWeek = new DayOfWeek();
  private showEditingUserInput = new UserInput();
  private showEditingAssignment = new Assignment();
  private showEditingPreCall = new ConnectPrecall();
  private showEditingSfcc = new SFCC();
  private showEditingCCXMLExit = new CCXMLExit();
  private showEditingReroute = new Reroute();
  private showEditingEnd = new End();

  private showEditingNode;
  private editingNode;

  private nodeList = [];
  private nodes = [];
  private malesource;
  private femalesource;

  private editAble = false;
  private copyAble = false;
  private parseAble = false;
  private deleteAble = false;
  
  private copyData = new Default();

  private actionMapping: IActionMapping = {
    mouse: {
      drop: (tree, node, event, object) => {
        if (object.from) {
          let from = object.from, to = object.to;
          if (to.parent.data.type == "Default") {
            this.dropNode(from, to);
          }
          if (from.data.type == "Default" && to.parent.data.type != "Default" && to.parent.data.type != "Home") {
            this.createShortCut(to, from);
          }
        }
      },
      dblClick: (tree, node, event) => {
        this.editNode(node);
      },
      contextMenu: (tree, node, event) => {
        this.showEditingNode = node.data;
        if(node.data.shortcut) {
          this.editAble = false;
          this.copyAble = false;
          this.parseAble = false;
          this.deleteAble = true;
        } else {
          switch(node.data.type) {
            case 'Default':
              this.editAble = false;
              this.copyAble = false;
              if(this.copyData.type !="Default")
                this.parseAble = true;
              this.deleteAble = false;
              break;
            case 'Home':
              this.editAble = true;
              this.copyAble = false;
              this.parseAble = false;
              this.deleteAble = false;
              break;
            default: 
              this.editAble = true;
              this.copyAble = true;
              if(this.copyData.type !="Default")
                this.parseAble = true;
              this.deleteAble = true;
          }
        }
      }
    }
  }
  constructor(private contextMenuService: ContextMenuService) {
    this.nodes = [new Home()];
    this.editingNode = {};
    const nodeList = [
      new Play(), new VariablePlay(), new DynamicPlay(), new UrlPlay(),
      new Transfer(), new Menu(), new Record(), new WebService(),
      new If(), new Load(), new Time(), new Date(),
      new DayOfWeek(), new UserInput(), new Assignment(), new ConnectPrecall(),
      new SFCC(), new CCXMLExit(), new Reroute(), new End()];

    this.nodeList = nodeList;
  }
  resetId(nodes) {
    for(let i = 0; i< nodes.length; i++){
      nodes[i].id = null;
      this.resetId(nodes[i].children);
    }
  }
  expandedNode(nodes) {
    this.tree.treeModel.setExpandedNode(this.tree.treeModel.getNodeById(nodes.id), true);
    if(nodes.children.length > 0) {
      for(let i=0; i< nodes.children.length; i++) {
        this.expandedNode(nodes.children[i]);
      }
    }
  }
  updateNode(object, nodes, value, shortcut?) {
    let id = object.id;
    let newId;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id == id) {
        newId = JSON.parse(JSON.stringify(nodes[i].id));
        let name = JSON.parse(JSON.stringify(nodes[i].name));
        nodes[i] = JSON.parse(JSON.stringify(value));
        nodes[i].id = newId;
        nodes[i].name = name;
        if(shortcut) {
          nodes[i].shortcut = true;
          nodes[i].children = [];
        }
        if(this.parseAble) {
          this.resetId(nodes[i].children);
        }
        this.tree.treeModel.update();
        this.expandedNode(nodes[i]);
        return;
      }
      if (nodes[i].children.length > 0) {
        this.updateNode(object, nodes[i].children, value, shortcut);
      }
    }
  }
  dropNode(from, to) {
    this.updateNode(to.parent, this.nodes, from.data, false);
  }
  createShortCut(to, from) {
    this.updateNode(from, this.nodes, to.parent.data, true);
  }
  editNode(node) {
    if (!node.data.shortcut) {
      switch (node.data.type) {
        case "Home":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingHome, null);
          this.editingNode = node;
          this.showEditingHome = node.data;
          this.homemodal.show();
          break;
        case "Menu":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingMenu, null);
          this.editingNode = node;
          this.showEditingMenu = node.data;
          this.menumodal.show();
          break;
        case "Play":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingPlay, null);
          this.editingNode = node;
          this.showEditingPlay = node.data;
          this.playmodal.show();
          break;
        case "VariablePlay":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingVariablePlay, null);
          this.editingNode = node;
          this.showEditingVariablePlay = node.data;
          this.variableplaymodal.show();
          break;
        case "DynamicPlay":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingDynamicPlay, null);
          this.editingNode = node;
          this.showEditingDynamicPlay = node.data;
          this.dynamicplaymodal.show();
          break;
        case "UrlPlay":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingUrlPlay, null);
          this.editingNode = node;
          this.showEditingUrlPlay = node.data;
          this.urlplaymodal.show();
          break;
        case "Transfer":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingTransfer, null);
          this.editingNode = node;
          this.showEditingTransfer = node.data;
          this.transfermodal.show();
          break;
        case "Record":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingRecord, null);
          this.editingNode = node;
          this.showEditingRecord = node.data;
          this.recordmodal.show();
          break;
        case "WebService":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingWebService, null);
          this.editingNode = node;
          this.showEditingWebService = node.data;
          this.webservicemodal.show();
          break;
        case "If":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingIf, null);
          this.editingNode = node;
          this.showEditingIf = node.data;
          this.ifmodal.show();
          break;
        case "Load":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingLoad, null);
          this.editingNode = node;
          this.showEditingLoad = node.data;
          this.loadmodal.show();
          break;
        case "Time":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingTime, null);
          this.editingNode = node;
          this.showEditingTime = node.data;
          this.timemodal.show();
          break;
        case "Date":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingDate, null);
          this.editingNode = node;
          this.showEditingDate = node.data;
          this.datemodal.show();
          break;
        case "DayOfWeek":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingDayOfWeek, null);
          this.editingNode = node;
          this.showEditingDayOfWeek = node.data;
          this.dayofweekmodal.show();
          break;
        case "UserInput":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingUserInput, null);
          this.editingNode = node;
          this.showEditingUserInput = node.data;
          this.userinputmodal.show();
          break;
        case "Assignment":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingAssignment, null);
          this.editingNode = node;
          this.showEditingAssignment = node.data;
          this.assignmentmodal.show();
          break;
        case "ConnectPrecall":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingPreCall, null);
          this.editingNode = node;
          this.showEditingPreCall = node.data;
          this.connectprecallmodal.show();
          break;
        case "SFCC":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingSfcc, null);
          this.editingNode = node;
          this.showEditingSfcc = node.data;
          this.sfccmodal.show();
          break;
        case "CCXMLExit":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingCCXMLExit, null);
          this.editingNode = node;
          this.showEditingCCXMLExit = node.data;
          this.ccxmlexitmodal.show();
          break;
        case "Reroute":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingReroute, null);
          this.editingNode = node;
          this.showEditingReroute = node.data;
          this.reroutemodal.show();
          break;
        case "End":
          Object.assign(this.editingNode, null);
          Object.assign(this.showEditingEnd, null);
          this.editingNode = node;
          this.showEditingEnd = node.data;
          this.endmodal.show();
          break;
      }
    }
  }
  copyNode(node) {
    if(node.data.type !="Default") {
      this.copyData = JSON.parse(JSON.stringify(node.data));
      this.copyData.id = null;
      for(let i=0; i< this.copyData.children.length; i++) {
        this.copyData.children[i] = new Default(this.copyData.children[i].name);
      }
      this.parseAble = true;
    }
  }
  copyTree(node) {
    if(node.data.type !="Default") {
      this.copyData = JSON.parse(JSON.stringify(node.data));
      this.copyData.id = null;
      this.parseAble = true;
    }
  }
  parseNode(node) {
    if(node.data.type =="Default") {
      this.updateNode(node , this.nodes, this.copyData);
      this.copyData = new Default();
      this.parseAble = false;
    }
  } 

  deleteNode(node) {
    if (!node.isRoot) {
      this.updateNode(node , this.nodes, new Default());
      this.tree.treeModel.update();
    }
  }
  validate() {

  }
  options = {
    actionMapping: this.actionMapping,
    allowDrag: false,
    allowDrop: true,
    getNodeClone: (node) => (JSON.parse(JSON.stringify(node.data)))
  };
  optionList = {
    allowDrag: true,
    allowDrop: false
  }

  thisNode(node) {
    console.log(node);
  }
  backFirstTab() {
    let list = document.getElementsByClassName('nav nav-tabs');
    for (let i = 0; i < list.length; i++) {
      let firsttab = list[i];
      if (firsttab) {
        setTimeout(() => {
          firsttab.getElementsByTagName('a')[0].click();
        }, 500);
      }
    }
  }

  onCancelEditHome() {
    this.homemodal.hide();
    this.backFirstTab();
  }

  onDoneEditHome(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.homemodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditMenu() {
    this.menumodal.hide();
    this.backFirstTab();
  }

  onDoneEditMenu(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.menumodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditPlay() {
    this.playmodal.hide();
    this.backFirstTab();
  }

  onDoneEditPlay(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.playmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditVariablePlay() {
    this.variableplaymodal.hide();
    this.backFirstTab();
  }

  onDoneEditVariablePlay(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.variableplaymodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditDynamicPlay() {
    this.dynamicplaymodal.hide();
    this.backFirstTab();
  }

  onDoneEditDynamicPlay(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.dynamicplaymodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditUrlPlay() {
    this.urlplaymodal.hide();
    this.backFirstTab();
  }

  onDoneEditUrlPlay(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.urlplaymodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditTransfer() {
    this.transfermodal.hide();
    this.backFirstTab();
  }

  onDoneEditTransfer(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.transfermodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditRecord() {
    this.recordmodal.hide();
    this.backFirstTab();
  }

  onDoneEditRecord(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.recordmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditWebService() {
    this.webservicemodal.hide();
    this.backFirstTab();
  }

  onDoneEditWebService(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.webservicemodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditIf() {
    this.ifmodal.hide();
    this.backFirstTab();
  }

  onDoneEditIf(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.ifmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditLoad() {
    this.loadmodal.hide();
    this.backFirstTab();
  }

  onDoneEditLoad(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.loadmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditTime() {
    this.timemodal.hide();
    this.backFirstTab();
  }

  onDoneEditTime(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.timemodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditDate() {
    this.datemodal.hide();
    this.backFirstTab();
  }

  onDoneEditDate(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.datemodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditDayOfWeek() {
    this.dayofweekmodal.hide();
    this.backFirstTab();
  }

  onDoneEditDayOfWeek(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.dayofweekmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditUserInput() {
    this.userinputmodal.hide();
    this.backFirstTab();
  }

  onDoneEditUserInput(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.userinputmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditAssignment() {
    this.assignmentmodal.hide();
    this.backFirstTab();
  }

  onDoneEditAssignment(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.assignmentmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditConnectPrecall() {
    this.connectprecallmodal.hide();
    this.backFirstTab();
  }

  onDoneEditConnectPrecall(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.connectprecallmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditSFCC() {
    this.sfccmodal.hide();
    this.backFirstTab();
  }

  onDoneEditSFCC(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.sfccmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditCCXMLExit() {
    this.ccxmlexitmodal.hide();
    this.backFirstTab();
  }

  onDoneEditCCXMLExit(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.ccxmlexitmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditReroute() {
    this.reroutemodal.hide();
    this.backFirstTab();
  }

  onDoneEditReroute(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.reroutemodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }

  onCancelEditEnd() {
    this.endmodal.hide();
    this.backFirstTab();
  }

  onDoneEditEnd(menu) {
    this.updateNode(this.editingNode, this.nodes, menu);
    this.endmodal.hide();
    this.backFirstTab();
    this.tree.treeModel.setExpandedNode(this.editingNode, true);
    this.tree.treeModel.update();
  }
}
