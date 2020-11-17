using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"
                            select 
                                  EmployeeId,
                                  EmployeeName, 
                                  Department,
                                  convert (varchar(10), DateOfjoining,120) as DateOfjoining, 
                                  PhotoFileName
                                               from dbo.Employee";

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

        public HttpResponseMessage Post(Employee payload)
        {
            DataTable table = new DataTable();

            string query = @"
                                insert into dbo.Employee values
                                (
                                    '" + payload.EmployeeName + @"',
                                    '" + payload.Department + @"',
                                    '" + payload.DateOfJoining + @"',
                                    '" + payload.PhotoFileName + @"'
                                 )
                                ";

            using (var connection = new SqlConnection(ConfigurationManager
                .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
            using (var cmd = new SqlCommand(query, connection))
            using (var data = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                data.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Save");
        }

        public HttpResponseMessage Put(Employee payload)
        {
            DataTable table = new DataTable();

            string query = @"
                                update dbo.Employee set 
                                EmployeeName='" + payload.EmployeeName + @"',
                                Department='" + payload.Department + @"',
                                DateOfJoining='" + payload.DateOfJoining + @"',
                                PhotoFileName='" + payload.PhotoFileName + @"'
                                where EmployeeId='" + payload.EmployeeId + @"'
                                ";

            using (var connection = new SqlConnection(ConfigurationManager
                .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
            using (var cmd = new SqlCommand(query, connection))
            using (var data = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                data.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "update");
        }

        public HttpResponseMessage Delete(int id)
        {
            DataTable table = new DataTable();

            string query = @"
                               delete from dbo.Employee
                                where EmployeeId='" + id + @"'
                                ";

            using (var connection = new SqlConnection(ConfigurationManager
                .ConnectionStrings["EmployeeAppDbB"].ConnectionString))
            using (var cmd = new SqlCommand(query, connection))
            using (var data = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                data.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Deleted");
        }
        [Route("api/Employee/Upload")]
        [HttpPost]
        public string ImageUpload()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                var postedFile = httpRequest.Files[0];
                string FileName = postedFile.FileName;

                var physicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + FileName);

                postedFile.SaveAs(physicalPath);

                return FileName;

            }
            catch (Exception)
            {
                return "error";
            }
        }
    }
}
