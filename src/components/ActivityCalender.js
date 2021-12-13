import {ResponsiveCalendar} from '@nivo/calendar'
import React from 'react';
import {maxBy, filter, get, defaultTo} from 'lodash';
import moment from "moment";

export default function ActivityCalender({data}) {
    const maxDay = get(maxBy(data,({day}) => moment(day)), 'day');
    const currentYear = moment(maxDay).year();
    const from = `${currentYear}-01-01`;
    const to = `${currentYear}-12-01`;
    const maxValue = maxBy(filter(data, ({day}) => moment(day).isBetween(moment(from), moment(to))), ({ value }) => value);

    return (
        <div style={{height: 260, flex: 1}}>
            <ResponsiveCalendar
                data={data}
                from={from}
                to={to}
                emptyColor="#eeeeee"
                colors={[ '#48ff5e','rgba(56,191,75,0.71)', 'rgba(50,163,69,0.93)', '#236329']}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                minValue={1}
                maxValue={defaultTo(get(maxValue, 'value'), 0)}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'row',
                        translateY: 36,
                        itemCount: 4,
                        itemWidth: 42,
                        itemHeight: 36,
                        itemsSpacing: 14,
                        itemDirection: 'right-to-left'
                    }
                ]}
            />
        </div>
    )
}
