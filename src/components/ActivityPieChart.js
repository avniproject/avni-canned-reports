import React from 'react';
import {ResponsivePie} from '@nivo/pie';
import {isEmpty} from 'lodash';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DateFilterMessage from "./DateFilterMessage";
import {Loading} from "./Loading";

const Empty = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{backgroundColor: '#e1e1e1', padding: 5, marginTop: 50}}>
                No data available
            </div>
        </div>
    )
};


export default function ActivityPieChart({data, chartName, height, loading, showDateFilterMessage}) {

    const renderData = () => (isEmpty(data) ? <Empty/> :
            <ResponsivePie
                data={data}
                margin={{top: 20, left: 80, bottom: 80, right: 20}}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                legends={[
                    {
                        anchor: 'top-left',
                        direction: 'column',
                        justify: false,
                        translateX: -70,
                        translateY: 0,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 0.5,
                        symbolSize: 14,
                        itemDirection: 'left-to-right',
                        itemTextColor: '#999',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
    );

    return (
        <div style={{height: height + 4}}>
            <Card sx={{width: '100%', height: (height - 4), marginTop: 4}} elevation={2}>
                <CardContent style={{height: height}}>
                    {showDateFilterMessage ? <DateFilterMessage/> : null}
                    <p style={{textAlign: 'center'}}>{chartName}</p>
                    {loading ? <Loading/> : renderData()}
                </CardContent>
            </Card>
        </div>
    )
};
