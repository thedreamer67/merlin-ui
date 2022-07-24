import { useState } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import './styles/Table.css';

const Table = (props) => {
  const { setSliderPosition, maxFrames, setSearchVideoSeeking } = props;
  const { probabilityData } = props;

  const tableData1 = probabilityData.map((x) => {
    const frame_id = x[0] + 1;
    const strprobability = x[1].toString();
    return { frame_number: frame_id, probability: strprobability };
  });
  const [tableData, setTableData] = useState(tableData1);

  const columns = [
    { label: 'Frame Number', accessor: 'frame_number' },
    { label: 'Probability (%)', accessor: 'probability' },
  ];

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === '0') return 1;
        if (b[sortField] === '0') return -1;
        if (a[sortField] === '0' && b[sortField] === '0') return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
            numeric: true,
          }) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setTableData(sorted);
    }
  };

  return (
    <div className='table_container'>
      <table className='table'>
        <TableHead columns={columns} handleSorting={handleSorting} />
        <TableBody
          columns={columns}
          tableData={tableData}
          maxFrames={maxFrames}
          setSliderPosition={setSliderPosition}
          setSearchVideoSeeking={setSearchVideoSeeking}
        />
      </table>
    </div>
  );
};

export default Table;
