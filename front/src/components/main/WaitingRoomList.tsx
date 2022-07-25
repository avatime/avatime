import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
interface IProps {}

/**
 * @author
 * @function @
 **/

interface Column {
  id: "name" | "head_count_boy" | "head_count_girl" | "age" | "sido_name" | "status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "방제목", minWidth: 170 },
  {
    id: "head_count_boy",
    label: "남자",
    minWidth: 50,
    align: "right",
  },
  {
    id: "head_count_girl",
    label: "여자",
    minWidth: 50,
    align: "right",
  },
  {
    id: "age",
    label: "나이",
    minWidth: 40,
    align: "right",
  },
  {
    id: "sido_name",
    label: "지역",
    minWidth: 170,
    align: "right",
  },

  {
    id: "status",
    label: "활성화상태",
    minWidth: 170,
    align: "right",
  },
];

interface waitingRoom {
  name: string;
  head_count: number;
  head_count_boy: number;
  head_count_girl: number;

  age: String;
  sido_name: String;
  status: number;
}

function createWaitingRoom(
  name: string,
  head_count: number,
  head_count_boy: number,
  head_count_girl: number,
  age: String,
  sido_name: String,

  status: number
): waitingRoom {
  return { name, head_count, head_count_boy, head_count_girl, sido_name, age, status };
}

// //정렬
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// type Order = "asc" | "desc";

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // This method is created for cross-browser compatibility, if you don't
// // need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }
// interface EnhancedTableProps {
//   numSelected: number;
//   onRequestSort: (event: React.MouseEvent<unknown>, property: keyof waitingRoom) => void;
//   onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   order: Order;
//   orderBy: string;
//   rowCount: number;
// }

// function EnhancedTableHead(props: EnhancedTableProps) {
//   const {  order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler =
//     (property: keyof waitingRoom) => (event: React.MouseEvent<unknown>) => {
//       onRequestSort(event, property);
//     };
//   }

const rows = [
  createWaitingRoom("방1", 3, 2, 1, "20대", "서울특별시", 0),
  createWaitingRoom("방 제목 2", 4, 2, 1, "20대", "부산광역시", 0),
  createWaitingRoom("방 3", 2, 2, 2, "30대", "대구광역시", 1),
  createWaitingRoom("방 제목 4", 3, 3, 3, "30대", "인천광역시", 1),
  createWaitingRoom("방 5", 4, 1, 1, "40대", "경상도", 0),
  createWaitingRoom("방 제목 6", 2, 1, 2, "50대 이상", "경상도", 0),
  createWaitingRoom("방 7", 4, 2, 2, "20대", "서울특별시", 0),
  createWaitingRoom("방 제목 8", 3, 2, 1, "20대", "경기도", 0),
  createWaitingRoom("방 9", 3, 3, 3, "30대", "경기도", 1),
  createWaitingRoom("방 제목 9", 4, 4, 4, "40대", "경기도", 1),
  createWaitingRoom("방 10", 2, 2, 2, "50대 이상", "서울특별시", 1),
  createWaitingRoom("방 제목 11", 3, 2, 1, "20대", "전라도", 0),
  createWaitingRoom("방 12", 3, 2, 1, "30대", "대전광역시", 0),
  createWaitingRoom("방 제목 13", 3, 2, 1, "40대", "제주도", 0),
  createWaitingRoom("방 14", 3, 2, 1, "50대 이상", "강원도", 0),
  createWaitingRoom("방 제목 15", 3, 2, 1, "20대", "강원도", 0),
];

export const WaitingRoomList: FC<IProps> = (props) => {
  return (
    <div>
      {" "}
      <Paper
        sx={{ width: "80%", overflow: "hidden", position: "absolute", right: "10%", bottom: "20%" }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};