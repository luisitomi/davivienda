import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NuevaInterfazComponent } from '../../components/nueva-interfaz/nueva-interfaz.component';
import { Interfaz } from '../../models/interfaz.model';
import { InterfacesService } from '../../services/interfaces.service';

@Component({
  selector: 'app-control-interfaces',
  templateUrl: './control-interfaces.component.html',
  styleUrls: ['./control-interfaces.component.scss']
})
export class ControlInterfacesComponent implements OnInit, OnDestroy {

  interfaces: Interfaz[] = [];
  getInterfacesSub?: Subscription;
  changeInterfacesSub?: Subscription;
  deleteInterfazSub?: Subscription;
  loadingInterfaces: boolean = false;

  estados: string[] = [];
  tiempos: string[] = [];
  getEstadosSub?: Subscription;
  getTiemposSub?: Subscription;

  filtrosForm = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
  });

  constructor(
    private interfacesService: InterfacesService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.buscar();
    this.getEstadosSub = this.interfacesService.getEstados().subscribe(
      estados => this.estados = estados,
    );
    this.getTiemposSub = this.interfacesService.getTiempos().subscribe(
      tiempos => this.tiempos = tiempos,
    );
  }

  ngOnDestroy(): void {
    this.getInterfacesSub?.unsubscribe();
    this.changeInterfacesSub?.unsubscribe();
    this.deleteInterfazSub?.unsubscribe();
    this.getEstadosSub?.unsubscribe();
    this.getTiemposSub?.unsubscribe();
  }

  buscar(): void {
    this.loadingInterfaces = true;
    this.getInterfacesSub = this.interfacesService.getInterfaces(
      this.filtrosForm.value.nombre,
      this.filtrosForm.value.descripcion,
    ).subscribe(
      interfaces => this.interfaces = interfaces,
      error => console.log(error),
      () => this.loadingInterfaces = false,
    );
  }

  actualizar(interfaces: Interfaz[]): void {
    this.changeInterfacesSub = this.interfacesService.actualizarInterfaces(interfaces).subscribe(
      ok => {
        this.snackBar.open('Interfaces Actualizadas');

        this.buscar();
      },
    );
  }

  nuevaInterfaz(): void {
    const dialogRef = this.matDialog.open(NuevaInterfazComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { estados: this.estados, tiempos: this.tiempos },
    });

    dialogRef.afterClosed().subscribe(
      result => result === 'creado' ? this.buscar() : null,
    );
  }

  eliminar(interfaz: Interfaz): void {
    this.deleteInterfazSub = this.interfacesService.eliminarInterfaz(interfaz).subscribe(
      ok => {
        this.snackBar.open('Interfaz eliminada');

        this.buscar();
      }
    )
  }

}
