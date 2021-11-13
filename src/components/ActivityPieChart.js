import React from 'react';
import {ResponsivePie} from '@nivo/pie';

export default function ActivityPieChart({data, chartName, height, itemLegendWidth}) {

    return (
        <div style={{height: height, flex: 1}}>
            <p>{chartName}</p>
            <ResponsivePie
                data={data}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
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
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 0,
                        translateY: 44,
                        itemsSpacing: 0,
                        itemWidth: itemLegendWidth,
                        itemHeight: 15,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 11,
                        symbolShape: 'circle',
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
        </div>
    )
}
