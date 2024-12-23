import React from 'react';
import MonthGroup from '../MonthGroup/MonthGroup';

function YearGroup({calendarData}) {
    const calendarDataEntries = Object.entries(calendarData);

    return (
        <ul>
            {
                calendarDataEntries?.map(([ year, months ]) => { // 비구조 할당으로 꺼낼때 괄호로 한 번 감싸줘야하는 듯
                    return <li key={year}>
                        <h2>{year}년</h2>
                        <MonthGroup months={months} />
                    </li>
                })
            }
        </ul>
    );
}

export default YearGroup;