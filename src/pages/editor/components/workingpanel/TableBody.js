import React from 'react';
import './styles/Table.css';

const TableBody = (props) => {
	const handleJumpToFrame = (value) => {
		props.setSearchVideoSeeking(true);
		const newSliderPosition = Number(
			(value.tData / props.maxFrames).toFixed(4)
		);
		props.setSliderPosition(newSliderPosition);
	};

	return (
		<tbody>
			{props.tableData.map((data) => {
				return (
					<tr key={data.id}>
						{props.columns.map(({ accessor }) => {
							const tData = data[accessor] ? data[accessor] : '——';
							return (
								<td
									key={accessor}
									onClick={() =>
										accessor === 'frame_number'
											? handleJumpToFrame({ tData })
											: null
									}
									style={
										accessor === 'frame_number' ? { cursor: 'pointer' } : null
									}
								>
									{tData}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
};

export default TableBody;
