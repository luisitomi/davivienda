import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOptgroup } from '@angular/material/core';
import { MatList, MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ReceptorNotificacion } from '../../models/receptor-notificacion.model';
import { ReceptoresService } from '../../services/receptores.service';

@Component({
  selector: 'app-mantenimiento-notificaciones',
  templateUrl: './mantenimiento-notificaciones.component.html',
  styleUrls: ['./mantenimiento-notificaciones.component.scss']
})
export class MantenimientoNotificacionesComponent implements OnInit, OnDestroy {

  @ViewChild('lista') lista?: MatOptgroup;
  @ViewChild('nuevoInput') nuevoInput?: ElementRef;

  buscarForm = new FormGroup({
    email: new FormControl(),
  });

  nuevoForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  receptores: ReceptorNotificacion[] = [];
  getReceptoresSub?: Subscription;
  nuevoReceptorSub?: Subscription;
  deleteReceptorSub?: Subscription;

  nuevoFormVisible: boolean = false;

  constructor(
    private receptoresService: ReceptoresService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.buscar();
  }

  ngOnDestroy(): void {
    this.getReceptoresSub?.unsubscribe();
    this.nuevoReceptorSub?.unsubscribe();
    this.deleteReceptorSub?.unsubscribe();
  }

  buscar(): void {
    this.getReceptoresSub = this.receptoresService.getReceptores(this.buscarForm.value.email).subscribe(
      receptores => this.receptores = receptores,
    );
  }

  onNuevo(): void {
    this.nuevoFormVisible = !this.nuevoFormVisible;
    this.nuevoForm.reset();
    setTimeout(() => {
      this.nuevoFormVisible ? this.nuevoInput?.nativeElement.focus() : null;
    }, 0);
  }

  onEliminar(receps: MatListOption[]): void {
    this.deleteReceptorSub = this.receptoresService.eliminarReceptores(receps.map(r => r.value)).subscribe(
      ok => {
        this.snackBar.open(ok);
        this.buscar();
      }
    );
  }

  crearReceptor(): void {
    this.nuevoReceptorSub = this.receptoresService.nuevoReceptor(this.nuevoForm.value).subscribe(
      ok => {
        this.nuevoFormVisible = false;
        this.nuevoForm.reset();
        this.snackBar.open(ok);
        this.buscar();
      }
    );
  }

  cancelarNuevo(): void {
    this.nuevoFormVisible = false;
    this.nuevoForm.reset();
  }

  get nuevoEmail(): AbstractControl | null {
    return this.nuevoForm.get('email');
  }

}
