import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HeaderLineService } from "projects/carga-asientos-manuales/src/app/carga-asientos/services/header-line.service";
import { finalize } from "rxjs/operators";
import { appConstants } from "../../../app-constants/app-constants";
import { UnsubcribeOnDestroy } from "../../../general/unsubscribe-on-destroy";
import { isEmpty } from "../../../helpers/general.helper";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent extends UnsubcribeOnDestroy implements OnInit {
  spinner: boolean;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Output() formInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;

  displayedColumns: String[] = [
    'codigo',
    'valor',
    'acciones',
  ]

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private headerLineService: HeaderLineService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    super();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.createForm();
    this.event();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      codigo: [null],
      valor: [null],
    });
    this.form.valueChanges.subscribe(() => {
      this.formInvalid.emit(this.form.invalid);
    });
  }

  showErrors(control: string): boolean {
    return (
      (this.form.controls[control].dirty || this.form.controls[control].touched) &&
      !isEmpty(this.form.controls[control].errors)
    );
  }

  search(): void {
    this.spinner = true;
    const valueForm = this.form.value;
    const request = {
      codigo: valueForm?.codigo,
      valor: valueForm?.valor,
      padre: this.data?.data?.name === appConstants.segmentValue.Oficina ? this.data?.data?.valueId1 : this.data?.data?.valueId2,
      tipo: this.data?.data?.name,
    }
    const $event = this.headerLineService
      .getApiUrlTsFahGetSegmentosWS(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          this.dataSource.data = response || [];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    this.arrayToDestroy.push($event)
  }

  event(): void {
    this.spinner = true;
    const request = {
      codigo: "",
      valor: "",
      padre: this.data?.data?.name === appConstants.segmentValue.Oficina ? this.data?.data?.valueId1 : this.data?.data?.valueId2,
      tipo: this.data?.data?.name,
    }
    const $event = this.headerLineService
      .getApiUrlTsFahGetSegmentosWS(request)
      .pipe(finalize(() => this.spinner = false))
      .subscribe(
        (response: any) => {
          this.dataSource.data = response || [];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    this.arrayToDestroy.push($event)
  }

  send(element: any): void {
    this.dialogRef.close(element);
  }
}