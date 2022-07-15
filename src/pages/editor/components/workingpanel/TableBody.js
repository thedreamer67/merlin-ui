import './styles/Table.css';

const TableBody = ({
	maxFrames,
	setSearchVideoSeeking,
	setSliderPosition,
	tableData,
	columns,
}) => {
	const handleJumpToFrame = (value) => {
		// console.log('onDuration', duration)
		console.log(value);
		setSearchVideoSeeking(true);
		const newSliderPosition = Number((value.tData / maxFrames).toFixed(4));
		console.log(newSliderPosition);
		setSliderPosition(newSliderPosition);
	};

	return (
		<tbody>
			{tableData.map((data) => {
				return (
					<tr key={data.id}>
						{columns.map(({ accessor }) => {
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
