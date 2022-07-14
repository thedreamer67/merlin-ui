import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import './styles/Table.css'

const Table = (props) => {
 const {setSliderPosition, maxFrames,setSearchVideoSeeking} = props
 const tableData1 =
 [
    {
     "frame_number": 1,
     "probability": '100'
    },
    {
     "frame_number": 2,
     "probability": '26'
    },
    {
     "frame_number": 3,
     "probability": '45'
    },
    {
     "frame_number": 4,
     "probability": '73'
    },
    {
     "frame_number": 5,
     "probability": '22'
    },
    {
     "frame_number": 6,
     "probability": '0'
    },
    {
     "frame_number": 7,
     "probability": '0'
    },
    {
     "frame_number": 8,
     "probability": '2'
    },
    {
     "frame_number": 9,
     "probability": '23'
    },
    {
     "frame_number": 10,
     "probability": '74'
    },
    {
     "frame_number": 11,
     "probability": '63'
    },
    {
     "frame_number": 12,
     "probability": '55'
    },
    {
     "frame_number": 13,
     "probability": '0'
    },
    {
     "frame_number": 14,
     "probability": '2'
    },
    {
     "frame_number": 15,
     "probability": '23'
    },
    {
     "frame_number": 16,
     "probability": '74'
    },
    {
     "frame_number": 17,
     "probability": '63'
    },
    {
     "frame_number": 18,
     "probability": '55'
    }
   ]

 const [tableData, setTableData] = useState(tableData1);

 const columns = [
  { label: "Frame Number", accessor: "frame_number" },
  { label: "Probability (%)", accessor: "probability" },
 ];

 const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
     const sorted = [...tableData].sort((a, b) => {
      if (a[sortField] === '0') return 1;
      if (b[sortField] === '0') return -1;
      if (a[sortField] === '0' && b[sortField] === '0') return 0;
      return (
       a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
        numeric: true,
       }) * (sortOrder === "asc" ? 1 : -1)
      );
     });
     setTableData(sorted);
    }
   };

 return (
    <div className="table_container">
        <table className="table">
            <TableHead columns={columns} handleSorting={handleSorting} />
            <TableBody columns={columns} tableData={tableData} maxFrames={maxFrames} setSliderPosition={setSliderPosition} setSearchVideoSeeking={setSearchVideoSeeking}/>
        </table>
    </div>
 );
};

export default Table;