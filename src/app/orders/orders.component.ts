import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Order {
  name: string;
  position: number;
  customer: string;
  symbol: string;
  date: Date;
  price: number;
}

let ELEMENT_DATA: Order[] = [
  { position: 1, name: 'Hydrogen', customer: 'Ivan', symbol: 'H', date: new Date(2022, 5, 12), price: 300 },
  { position: 2, name: 'Helium', customer: 'Milivoj', symbol: 'He', date: new Date(2001, 1, 22), price: 1000 },
  { position: 3, name: 'Lithium', customer: 'Leonardo', symbol: 'Li', date: new Date(2021, 4, 20), price: 115 },
  { position: 4, name: 'Beryllium', customer: 'Stella', symbol: 'Be', date: new Date(2012, 12, 1), price: 8641 },
  { position: 5, name: 'Boron', customer: 'Mario', symbol: 'B', date: new Date(2015, 25, 5), price: 100 },
  { position: 6, name: 'Carbon', customer: 'Mihael', symbol: 'C', date: new Date(2002, 31, 2), price: 50 },
  { position: 7, name: 'Nitrogen', customer: 'Mislav', symbol: 'N', date: new Date(1992, 1, 3), price: 60 },
  { position: 8, name: 'Oxygen', customer: 'Paola', symbol: 'O', date: new Date(1768, 10, 17), price: 8894 },
  { position: 9, name: 'Fluorine', customer: 'Karolina', symbol: 'F', date: new Date(1957, 8, 22), price: 10025 },
  { position: 10, name: 'Neon', customer: 'Matija', symbol: 'Ne', date: new Date(1995, 11, 31), price: 99 },
  { position: 11, name: 'Sodium', customer: 'Monika', symbol: 'Na', date: new Date(1974, 3, 28), price: 14 },
  { position: 12, name: 'Magnesium', customer: 'Jože', symbol: 'Mg', date: new Date(2017, 9, 30), price: 2019 },
  { position: 13, name: 'Aluminum', customer: 'Jura', symbol: 'Al', date: new Date(2019, 2, 15), price: 83 },
  { position: 14, name: 'Silicon', customer: 'Stipe', symbol: 'Si', date: new Date(2022, 4, 17), price: 127 },
  { position: 15, name: 'Phosphorus', customer: 'Halid', symbol: 'P', date: new Date(1999, 7, 5), price: 22 },
  { position: 16, name: 'Sulfur', customer: 'Jovan', symbol: 'S', date: new Date(2019, 1, 16), price: 1871 },
  { position: 17, name: 'Chlorine', customer: 'Janez', symbol: 'Cl', date: new Date(1010, 5, 19), price: 2780 },
  { position: 18, name: 'Argon', customer: 'Đuro', symbol: 'Ar', date: new Date(2008, 9, 24), price: 368 },
  { position: 19, name: 'Potassium', customer: 'Katarina', symbol: 'K', date: new Date(2000, 12, 14), price: 69 },
  { position: 20, name: 'Calcium', customer: 'Mišo', symbol: 'Ca', date: new Date(2009, 11, 11), price: 131 },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'customer', 'symbol', 'date', 'price'];
  dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private router: Router, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.value.trim().toLocaleLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: ELEMENT_DATA,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
      // ELEMENT_DATA.push(result);
      // this.dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);
    });
  }


  add(form: any) {
    console.log(form);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-newitem.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}