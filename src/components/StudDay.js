import * as React from "react";
import {DataGrid , gridColumnPositionsSelector, GridToolbar} from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";
import AtendedStud from "./AtendedStu";
import { useLocation } from "react-router";
import {  studentsDData } from "./emtu.js"

const paymint = {}
const columns = [
  { field: "id", headerName: "كود الطالب", width: 300 , status: false,
  traderName: false,hide:true},
  { field: "name", headerName: "الإسم", width: 150 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  { field: "phone", headerName: "رقم الهاتف", type: "number", width: 150 },
  { field: "type", headerName: "المدرسه", width: 130 },
  { field: "hour", headerName: "الساعه", width: 70 },
  {
    field: "mony1",
    headerName: "فلوس الشهر",
    width: 100,
    editable: true,
    preProcessEditCellProps: (props) =>  {  paymint[props.id] =  props.props.value},
    bgcolor: "#376331",
  },
  {
    field: "mony2",
    headerName: "test mony input 2",
    width: 100,
    hide:true,
    editable: true,
    preProcessEditCellProps: (props) =>  console.log( "mony2", props, props.id,props.props.value),
    bgcolor: "#376331",
    color:"red"
  },
];


export default function StudDay() {
  const location = useLocation();
  const [ids, setIds] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [relood, Setrelood] = React.useState(true);

  const group = location.state ? location.state.group : "1";

  React.useEffect(() => {
    
    setStudents(studentsDData.students)
    // axiosPublic
    //   .post("/getTodaysAttendence",  {group:group.toString()})
    //   .then((res) => {
    //     console.log(res.data.students);
    //     return setStudents(res.data.students);
    //   })
    //   .then((err) => setStudents(studentsDData.students));
  }, [relood,group]);

  const idsFormater = (ids) => {
    let arr = [];
    for (let i = 0; i < ids.length; i++) {
      console.log({ id: ids[i] });

      arr.push({ id: ids[i] });
    }
    return arr;
  };

  /////////////paymint//////////////
  const paymintformater = (opj) => {
    let arr = []
    Object.keys(opj).forEach(function(key, index) {
     arr.push( {
      st_id : key , 
      money : opj[key]
    })
    });
    return arr
  };

  const paymintHandeler = async () => {
    await axiosPublic
      .post("/putStudentMoney", {
        StudentsMonthlyMoney: paymintformater(paymint),
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    Setrelood(!relood);
  };
  // prompt("hi")
  
  /////////////////////////////
  const atttendHandeler = async () => {
    await axiosPublic
      .post("/atttendStudent", {
        studentsIds: idsFormater(ids),
      })
      .then((res) => console.log(res))
      .then((err) => console.log(err));
    Setrelood(!relood);
  };

  
  return (
    <div style={{ height: 500, width: "100%" }}>
      
      <DataGrid

      components={{ Toolbar: GridToolbar }}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
       rowHeight={true ?20 : null } 
       
        // onValueChange={(params) => console.log("on", params)}
        rows={students}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={18}
        pagination
        rowsPerPageOptions={[10]}
        checkboxSelection
        // onCellEditStop={handleCellEditStop}
        
        onSelectionModelChange={(e) => {
          setIds(e);
        }}
        isRowSelectable={(params) => {
          return true;
        }}
      />

      <Button variant="contained" sx={{margin : 2, fontSize:20}} 
      onClick={() => atttendHandeler()}> تسجيل الغياب  </Button>

   <Button variant="contained" sx={{margin : 2, fontSize:20}} 
      onClick={() => paymintHandeler()}> اضافة المدفوعات </Button>
      <AtendedStud />
    </div>
  );
}
