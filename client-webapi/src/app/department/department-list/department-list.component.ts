import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../common.service';

@Component({
    selector: 'app-department-list',
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent implements OnInit {

    departmentList: any = [];
    departmentListWithoutFilter: any = [];
    modalTitle: string = '';
    isModalOpen: boolean = false;
    department: any = {
        DepartmentId: 0,
        DepartmentName: ''
    };

    filter: any = {
        DepartmentName: '',
        DepartmentId: ''
    };

    constructor(private service: CommonService) {
    }

    ngOnInit(): void {
        this.getDepartmentList();
    }

    getDepartmentList() {
        this.service.getDeptList().subscribe(data => {
            this.departmentList = data;
            this.departmentListWithoutFilter = data;
        });
    }

    openModal() {
        this.modalTitle = 'Add Department';
        this.department = {
            DepartmentId: 0,
            DepartmentName: ''
        };
    }

    editDepartment(item: any) {
        this.department = item;
        this.modalTitle = 'Update Department';
    }

    SaveOrUpdateDept() {
        if (this.department.DepartmentId === 0) {
            debugger
            this.service.saveDept(this.department)
                .subscribe(res => {
                    this.isModalOpen = true;
                    alert(res.toString());
                    this.getDepartmentList();
                });
        } else {
            this.service.updateDept(this.department)
                .subscribe(res => {
                    this.isModalOpen = true;
                    alert(res.toString());
                    this.getDepartmentList();
                });
        }
    }

    deleteDept(id: any) {
        this.service.deleteDept(id)
            .subscribe(res => {
                alert(res.toString());
                this.getDepartmentList();
            });
    }

    filtering() {
        this.departmentList = this.departmentListWithoutFilter.filter((el: any) => {
            return el.DepartmentId.toString().trim().toLowerCase()
                    .includes(this.filter.DepartmentId.toString().trim().toLowerCase()) &&
                el.DepartmentName.toString().trim().toLowerCase()
                    .includes(this.filter.DepartmentName.toString().trim().toLowerCase());
        });
    }

    sorting(props: any, asc: any) {
        this.departmentList = this.departmentListWithoutFilter.sort((a: any, b: any) => {
            if (asc) {
                return (a[props] > b[props] ? 1 : ((a[props] < b[props]) ? -1 : 0));
            } else {
                return (b[props] > a[props] ? 1 : ((b[props] < a[props]) ? -1 : 0));
            }
        });
    }
}
