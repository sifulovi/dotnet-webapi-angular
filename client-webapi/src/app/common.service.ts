import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    API_URL = 'http://localhost:11899/api';
    API_PHOTO = 'http://localhost:11899/Photos/';

    constructor(private http: HttpClient) {
    }

    getDeptList(): Observable<any[]> {
        return this.http.get<any>(`${this.API_URL}/Department/`);
    }

    saveDept(val: any) {
        debugger
        return this.http.post(`${this.API_URL}/Department`, val);
    }

    updateDept(val: any) {
        return this.http.put(`${this.API_URL}/Department`, val);
    }

    deleteDept(val: any) {
        return this.http.delete(`${this.API_URL}/Department/${val}`);
    }

    //employee

    getEmpList(): Observable<any[]> {
        return this.http.get<any>(`${this.API_URL}/Employee/`);
    }

    saveEmp(val: any) {
        return this.http.post(`${this.API_URL}/Employee/`, val);
    }

    updateEmp(val: any) {
        return this.http.put(`${this.API_URL}/Employee/`, val);
    }

    deleteEmp(val: any) {
        return this.http.delete(`${this.API_URL}/Employee/${val}`);
    }

    uploadPhoto(val: any) {
      return this.http.post(`${this.API_URL}/Employee/Upload/`, val);
    }
}
