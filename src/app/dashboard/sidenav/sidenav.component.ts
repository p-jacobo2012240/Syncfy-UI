import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public menuOptions: string[] = ['Configuración de métricas', 'Tareas automatizadas', 'Configuración de alertas',];

  constructor() { }

  ngOnInit(): void {
  }

}
