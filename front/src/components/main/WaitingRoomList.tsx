import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


interface Column {
  id: "id" | "name" | "head_count_boy" | "head_count_girl" | "지역" | "연령";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

// const columns: Column[] = [
//   { id: "id", label: "#", minWidth: 70 },
//   { id: "name", label: "방제목", minWidth: 170 },
//   {
//     id: "head_count_boy",
//     label: "남자",
//     minWidth: 70,
//     align: "right",
//   },
//   {
//     id: "head_count_girl",
//     label: "여자",
//     minWidth: 70,
//     align: "right",
//     format: (value: number) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Density",
//     minWidth: 170,
//     align: "right",
//     format: (value: number) => value.toFixed(2),
//   },
// ];

interface waitingRoom {
  id: number;
  name: string;
  head_count : number;
  head_count_boy : number;
  head_count_girl : number;
  status : boolean;
  sido_id : number;
  

  
}


// function createWaitingRoom( id: number,
//   name: string,
//   head_count_boy : number,
//   head_count_girl : number,
//   status : boolean,
//   sido_id : number): waitingRoom {
  
//   return { id, name, head_count_boy,head_count_girl, status, sido_id };
// }

// const rows = [
//  createWaitingRoom();
// ];

// export default function waitingRoomList() {
//   return (
//     <Paper sx={{ width: "100%", overflow: "hidden" }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
                  
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                   {columns.map((column) => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === "number" ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   );
// }
