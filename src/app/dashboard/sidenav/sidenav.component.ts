import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() tempNavigation = new EventEmitter<string>();
  public menuOptions: string[] = ['Configuración de métricas', 'Tareas automatizadas', 'Configuración de alertas',];

  constructor() { }

  ngOnInit(): void {
  }

  selection(option: string) {
    //TEMP
    // the optimal approach its using navigation quit this way ASAP
    switch(option){
      case 'Configuración de métricas':
        this.tempNavigation.emit('metrics');
      break;
      case 'Tareas automatizadas':
        this.tempNavigation.emit('automatedTasks')
      break;
      case 'Configuración de alertas':
        this.tempNavigation.emit('alerts')
      break;
    }
  }


}
