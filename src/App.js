import "./App.css";

import SideNav from "../src/components/Drawer/Drawer";
// import { testEndPoints } from './test/test';
// import {postArr,getArr,postReq} from "./test/testData"
// import {createUsers,names} from "./test/studintcreation"
// import {deleteStudents} from "./test/deletStu"
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  // createUsers(names,100)
// console.log(testEndPoints(postArr, "post",postReq))
// console.log(">>>>>>>>>>>>get test ",testEndPoints(getArr,"get"))
// deleteStudents()
//theme={darkTheme}
  return (
    // <ThemeProvider >
    //   <CssBaseline />
    <div className="App">
      <SideNav />
    </div>
    // </ThemeProvider>
  );
}
export default App;
