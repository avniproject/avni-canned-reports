import {ResponsiveCalendar} from '@nivo/calendar'
import React from 'react';
import {maxBy, filter} from 'lodash';
import moment from "moment";

export default function ActivityCalender({data}) {
    const currentYear = 2021;
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
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                minValue={1}
                maxValue={maxValue.value}
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
