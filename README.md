# dotnet-webapi-angular

## Objective:
To build a web api based Web application in .NET. 

## Technologies 
  1. .NET Web API
  2. Microsoft SQL 
  3. Angular-10 as frontend
  
The **WebApi** directory is responsible for back-end & 
the **client-webapi** directory is responsible for front-end.
  
## Database Initialization :
Open MS SQL management Studio and write done ever SQL step by step:

Step 1: Creating a database with name **EmployeeDbB**
```
 create database EmployeeDbB
```
Step 2: Creating two tables Department, Employee for db
```
create table dbo.Department(
 DepartmentId int identity(1,1),
 DepartmentName varchar(50)
)

create table dbo.Employee(
 EmployeeId int identity(1,1),
 EmployeeName varchar(200),
 Department varchar(50),
 DateOfJoining date,
 PhotoFileName varchar(200)
)
```
Step 3: Add some data on tables
```
insert into dbo.Department values('IT');
insert into dbo.Department values('Support');

insert into dbo.Employee values('Alex curry','IT','2020-05-01','uni.png');
insert into dbo.Employee values('Mark curry','Support','2020-05-07','uni1.png');
```

