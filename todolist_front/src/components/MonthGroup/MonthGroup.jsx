import React from 'react';
import TodoInfo from '../TodoInfo/TodoInfo';

function MonthGroup({ months }) {
    const monthEntries = Object.entries(months);

    return (
        <ul>
            {
                monthEntries?.map(([ key, value ]) => {
                    return <li key={key}>
                        <h3>{key}월</h3>
                        <TodoInfo todos={value} />
                    </li>
                })
            }
        </ul>
    );
}

export default MonthGroup;