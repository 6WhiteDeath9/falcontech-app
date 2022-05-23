import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface Order {
    name: string;
    position?: number;
    customer: string;
    active: boolean;
    date?: Date;
    price?: number;
}

const ELEMENT_DATA: Order[] = [
    { position: 1, name: 'Hydrogen', customer: 'Ivan', active: true, date: new Date(2022, 5, 12), price: 300 },
    { position: 2, name: 'Helium', customer: 'Milivoj', active: true, date: new Date(2001, 1, 22), price: 1000 },
    { position: 3, name: 'Lithium', customer: 'Leonardo', active: true, date: new Date(2021, 4, 20), price: 115 },
    { position: 4, name: 'Beryllium', customer: 'Stella', active: true, date: new Date(2012, 12, 1), price: 8641 },
    { position: 5, name: 'Boron', customer: 'Mario', active: true, date: new Date(2015, 25, 5), price: 100 },
    { position: 6, name: 'Carbon', customer: 'Mihael', active: true, date: new Date(2002, 31, 2), price: 50 },
    { position: 7, name: 'Nitrogen', customer: 'Mislav', active: true, date: new Date(1992, 1, 3), price: 60 },
    { position: 8, name: 'Oxygen', customer: 'Paola', active: true, date: new Date(1768, 10, 17), price: 8894 },
    { position: 9, name: 'Fluorine', customer: 'Karolina', active: true, date: new Date(1957, 8, 22), price: 10025 },
    { position: 10, name: 'Neon', customer: 'Matija', active: true, date: new Date(1995, 11, 31), price: 99 },
    { position: 11, name: 'Sodium', customer: 'Monika', active: true, date: new Date(1974, 3, 28), price: 14 },
    { position: 12, name: 'Magnesium', customer: 'Jože', active: true, date: new Date(2017, 9, 30), price: 2019 },
    { position: 13, name: 'Aluminum', customer: 'Jura', active: true, date: new Date(2019, 2, 15), price: 83 },
    { position: 14, name: 'Silicon', customer: 'Stipe', active: true, date: new Date(2022, 4, 17), price: 127 },
    { position: 15, name: 'Phosphorus', customer: 'Halid', active: true, date: new Date(1999, 7, 5), price: 22 },
    { position: 16, name: 'Sulfur', customer: 'Jovan', active: true, date: new Date(2019, 1, 16), price: 1871 },
    { position: 17, name: 'Chlorine', customer: 'Janez', active: true, date: new Date(1010, 5, 19), price: 2780 },
    { position: 18, name: 'Argon', customer: 'Đuro', active: true, date: new Date(2008, 9, 24), price: 368 },
    { position: 19, name: 'Potassium', customer: 'Katarina', active: true, date: new Date(2000, 12, 14), price: 69 },
    { position: 20, name: 'Calcium', customer: 'Mišo', active: true, date: new Date(2009, 11, 11), price: 131 },
];

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements AfterViewInit {

    displayedColumns: string[] = ['position', 'name', 'customer', 'active', 'date', 'price', 'edit'];
    dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;

    @ViewChild(MatSort)
    sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(private router: Router, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) { }

    logout() {
        localStorage.removeItem('loggedIn');
        this.router.navigate(['/login']);
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    applyFilter(filterValue: any) {
        this.dataSource.filter = filterValue.value.trim().toLocaleLowerCase();
    }

    openDialog(ID?: number): void {
        let data: Order = { name: '', customer: '', active: true };
        if (ID != null) {
            const found = this.dataSource.data.find(i => i.position === ID);
            if (found) {
                data = found;
            }
        }

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: data,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (result.position != null) {
                    const index = this.dataSource.data.findIndex(i => i.position === result.position);
                    if (index !== -1) {
                        this.dataSource.data[index] = result;
                    }
                } else {
                    const newIndex = this.dataSource.data.length + 1;
                    result.position = newIndex;
                    this.dataSource.data.push(result);
                }
            }
        });
    }

    openEdit(ID: number) {
        console.log('edit', ID);
        this.openDialog(ID);
    }

    deleteOrder(ID: number) {
        const greenLight: boolean = confirm('Are you sure you want to delete the selected order?');

        // If ok was pressed
        if (greenLight === true) {
            let newList: Order[] = [];
            this.dataSource.data.forEach(elem => {
                if (elem.position != ID) {
                    newList.push(elem);
                }
            });
            this.dataSource.data = newList;
        }
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
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    add(form: Order): void {
        let data = form;
        data.date = new Date(form.date ?? Date.now());
        this.dialogRef.close(form);
    }

    checkboxChange(e: any) {
        this.data.active = e.checked;
    }
}