import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HeaderLineService } from "projects/carga-asientos-manuales/src/app/carga-asientos/services/header-line.service";
import { finalize } from "rxjs/operators";
import { UnsubcribeOnDestroy } from "../../../general/unsubscribe-on-destroy";

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

  displayedColumns: String[] = [
    'codigo',
    'valor',
    'acciones',
  ]

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private headerLineService: HeaderLineService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    super();
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.event();
  }

  event(): void {
    this.spinner = true;
    const request = {
      codigo: "",
      valor: "",
      padre: this.data?.data?.valueId,
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