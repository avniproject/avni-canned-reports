import {ResponsiveCalendar} from '@nivo/calendar'
import React from 'react';

export default function ActivityCalender({data}) {

    return (
        <div style={{height: 260, flex: 1}}>
            <ResponsiveCalendar
                data={data}
                from="2021-01-01"
                to="2021-12-01"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                minValue={1}
                maxValue={500}
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
