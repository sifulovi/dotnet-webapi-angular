import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../common.service';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

    employeeList: any = [];
    modalTitle: string = '';
    isModalOpen: boolean = false;
    employee: any = {
        EmployeeId: 0,
        EmployeeName: '',
        DateOfjoining: '',
        PhotoFileName: '',
        Department: ''
    };
    Departments: any = [];
    photoUrl: string = '';

    constructor(private service: CommonService) {
    }

    ngOnInit(): void {
        this.getEmployeeList();
    }

    getEmployeeList() {
        this.service.getEmpList()
            .subscribe(data => {
                this.employeeList = data;
            });
        this.service.getDeptList()
            .subscribe(data => {
                this.Departments = data;
            });
    }

    openModal() {
        this.modalTitle = 'Add Employee Info';
    }

    editEmployee(item: any) {
        this.employee = item;
        this.photoUrl = this.service.API_PHOTO + this.employee.PhotoFileName;
        this.modalTitle = 'Update Employee Info';
    }

    SaveOrUpdateEmployee() {
        if (this.employee.EmployeeId === 0) {
            this.service.saveEmp(this.employee)
                .subscribe(res => {
                    this.isModalOpen = true;
                    this.employee = {
                        EmployeeId: 0,
                        EmployeeName: '',
                        DateOfjoining: '',
                        PhotoFileName: '',
                        Department: ''
                    };
                    alert(res.toString());
                    this.getEmployeeList();
                });
        } else {
            this.service.updateEmp(this.employee)
                .subscribe(res => {
                    this.employee = {
                        EmployeeId: 0,
                        EmployeeName: '',
                        DateOfjoining: '',
                        PhotoFileName: '',
                        Department: ''
                    };
                    this.isModalOpen = true;
                    alert(res.toString());
                    this.getEmployeeList();
                });
        }
    }

    deleteEmployee(id: any) {
        this.service.deleteEmp(id)
            .subscribe(res => {
                alert(res.toString());
                this.getEmployeeList();
            });
    }

    uploadEmployee(e: any) {
        let file = e.target.files[0];
        const formData: FormData = new FormData();
        formData.append('uploadedFile', file, file.name);
        this.service.uploadPhoto(formData)
            .subscribe(res => {
                this.employee.PhotoFileName = res.toString();
                this.photoUrl = this.service.API_PHOTO + this.employee.PhotoFileName;
            });
    }

}
