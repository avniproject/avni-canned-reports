import {ResponsiveCalendar} from '@nivo/calendar'
import React from 'react';
import {defaultTo, filter, get, maxBy} from 'lodash';
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Loading} from "./Loading";

export default function ActivityCalender({data, loading, title}) {
    const maxDay = get(maxBy(data, ({day}) => moment(day)), 'day');
    const currentYear = moment(maxDay).year();
    const from = `${currentYear}-01-01`;
    const to = `${currentYear}-12-31`;
    const maxValue = maxBy(filter(data, ({day}) => moment(day).isBetween(moment(from), moment(to))), ({value}) => value);

    const renderData = () => (
        <ResponsiveCalendar
            data={data}
            from={from}
            to={to}
            emptyColor="#eeeeee"
            colors={['#48ff5e', 'rgba(56,191,75,0.71)', 'rgba(50,163,69,0.93)', '#236329']}
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

    );

    return (
        <div style={{height: 300, flex: 1}}>
            <Card sx={{width: '100%', marginTop: 2, height: 300}} elevation={2}>
                <CardContent style={{height: 300}}>
                    <p style={{textAlign: 'center'}}>{title}</p>
                    {loading ? <Loading/> : renderData()}
                </CardContent>
            </Card>
        </div>
    )
}
