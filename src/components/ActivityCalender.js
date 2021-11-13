import {ResponsiveCalendar} from '@nivo/calendar'
import React from 'react';

export default function ActivityCalender({data}) {

    //TODO: fix the max value and from and to year values(right now hard coded)
    return (
        <div style={{height: 500, flex: 1}}>
            <ResponsiveCalendar
                data={data}
                from="2020-03-01"
                to="2021-07-12"
                emptyColor="#eeeeee"
                colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                minValue={1}
                maxValue={600}
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
