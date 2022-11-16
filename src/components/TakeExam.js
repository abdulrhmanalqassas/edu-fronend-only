import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { axiosPublic } from "../api/axiosPublic";
import { Button } from "@mui/material";
import AtendedStud from "./AtendedStu";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const paymint = {};
const columns = [
  {
    field: "id",
    headerName: "كود الطالب",
    width: 300,
    status: false,
    traderName: false,
    hide: true,
  },
  { field: "name", headerName: "الإسم", width: 150 },
  { field: "grade", headerName: "السنه", width: 130 },
  { field: "group_", headerName: "المجموعه", width: 130 },
  {
    field: "mony1",
    headerName: "درجه الطالب",
    width: 100,
    editable: true,
    preProcessEditCellProps: (props) => {
      paymint[props.id] = props.props.value;
    },
    bgcolor: "#376331",
  },
];

export default function TakeExam() {
  const [examValue, setExamValue] = React.useState("");
  const [ids, setIds] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [examType, setExamType] = React.useState(true);
  const [relood, Setrelood] = React.useState(true);
  React.useEffect(() => {
    axiosPublic
      .get("/getStudents")
      .then((res) => {
        console.log(res.data.students);
        return setStudents(res.data.students);
      })
      .then((err) => console.log(err));
  }, []);


  /////////////paymint//////////////
  const paymintformater = (opj) => {
    let arr = [];
    Object.keys(opj).forEach(function (key, index) {
      arr.push({
        st_id: key,
        money: opj[key],
      });
    });
    return arr;
  };

  const examHandeler = async () => {
    await axiosPublic
      .post("/createExam", {
        // {studentsResults : {exam : exam}[] , ExamType : boolean , date : string }
        StudentsMonthlyMoney: paymintformater(paymint),
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
        rowHeight={true ? 20 : null}
        rows={students}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={18}
        
      />

      <TextField
       sx={{margin : 2, fontSize:20}}
        id="outlined-select-grade"
        label=" درجه الامتحان"
        value={examValue}
        onChange={(e) => setExamValue(e.target.value)}
        helperText="Please select the "
      ></TextField>

      <TextField
       sx={{margin : 2, fontSize:20}}
        id="outlined-select-grade"
        select
        label="نوع الامتحان"
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        helperText="نوع الامتحان"
      >
        {["شهري", "يومي"].map((option) => (
          <MenuItem key={option} value={option === "شهري" ? true : false}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        sx={{ margin: 2, fontSize: 20 }}
        onClick={() =>examHandeler()}
      >
        {" "}
        اضافة الإمتحنات{" "}
      </Button>
    </div>
  );
}
