using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {

            string query = @"select DepartmentId, DepartmentName from dbo.Department";

            DataTable table = new DataTable();

            using (var connection = new SqlConnection(ConfigurationManager
                .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
            using (var cmd = new SqlCommand(query, connection))
            using (var data = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                data.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);

        }

        public HttpResponseMessage Post(Department payload)
        {
            try
            {
                string query = @"
                                insert into dbo.Department values
                                ('"+ payload.DepartmentName + @"')
                                ";
                DataTable table = new DataTable();

                using (var connection = new SqlConnection(ConfigurationManager
                    .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var data = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    data.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.OK, "Successfully department is created!");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Error!");
            }
        }

        public HttpResponseMessage Put(Department payload)
        {
            try
            {
                string query = @"
                                update dbo.Department set DepartmentName=
                                '" + payload.DepartmentName + @"'
                                where DepartmentId='"+payload.DepartmentId+@"'
                                ";
                DataTable table = new DataTable();

                using (var connection = new SqlConnection(ConfigurationManager
                    .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var data = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    data.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.Created, "Successfully department is updated!");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Error!");
            }
        }

        public HttpResponseMessage Delete(int id)
        {
            try
            {
                string query = @"
                               delete from dbo.Department
                                where DepartmentId='" + id + @"'
                                ";
                DataTable table = new DataTable();

                using (var connection = new SqlConnection(ConfigurationManager
                    .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
                using (var cmd = new SqlCommand(query, connection))
                using (var data = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    data.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.OK, " Department is deleted!");
            }
            catch (Exception)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Error!");
            }
        }
    }
}
