import React, { useState } from 'react';

const TableHead = (props) => {
	const [sortField, setSortField] = useState('');
	const [order, setOrder] = useState('asc');

	const handleSortingChange = (accessor) => {
		const sortOrder =
			accessor === sortField && order === 'asc' ? 'desc' : 'asc';
		setSortField(accessor);
		setOrder(sortOrder);
		props.handleSorting(accessor, sortOrder);
	};

	return (
		<thead>
			<tr>
				{props.columns.map(({ label, accessor }) => {
					return (
						<th
							key={accessor}
							onClick={() => handleSortingChange(accessor)}
							style={{ cursor: 'pointer' }}
						>
							{label}
						</th>
					);
				})}
			</tr>
		</thead>
	);
};

export default TableHead;
