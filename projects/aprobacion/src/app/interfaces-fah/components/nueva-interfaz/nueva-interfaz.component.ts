import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { InterfacesService } from '../../services/interfaces.service';

@Component({
  selector: 'app-nueva-interfaz',
  templateUrl: './nueva-interfaz.component.html',
  styleUrls: ['./nueva-interfaz.component.scss']
})
export class NuevaInterfazComponent implements OnInit {

  nuevoForm = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.required]),
    estado: new FormControl(null, [Validators.required]),
    periodicidad: new FormControl(null, [Validators.required]),
  });

  estadoOptions: string[] = [];
  periodicidadOptions: string[] = [];

  crearInterfazSub?: Subscription;

  constructor(
    private interfacesService: InterfacesService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NuevaInterfazComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { estados: string[], tiempos: string[] }
  ) {
    this.estadoOptions = data.estados;
    this.periodicidadOptions = data.tiempos;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  crear(): void {
    this.crearInterfazSub = this.interfacesService.crearInterfaz(this.nuevoForm.value).subscribe(
      ok => {
        this.snackBar.open('Interfaz creada');
        this.dialogRef.close('creado');
      },
    );
  }

}
