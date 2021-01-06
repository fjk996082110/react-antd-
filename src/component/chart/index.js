import React from 'react'
import { Chart, Line, Point, Tooltip } from 'bizcharts'
import axios from '../../axios/diyAxios'

const ChartIndex = (props) => {
	const data = [
		{
			month: "Jan",
			city: "Tokyo",
			temperature: 7
		},
		{
			month: "Jan",
			city: "London",
			temperature: 3.9
		},
		{
			month: "Feb",
			city: "Tokyo",
			temperature: 17
		},
		{
			month: "Feb",
			city: "London",
			temperature: 13.9
		},
		{
			month: "ma",
			city: "Tokyo",
			temperature: 27
		},
		{
			month: "ma",
			city: "London",
			temperature: 3.9
		},
	]
	const scale = {
		temperature : {min:0},
		city: {
			formatter: v => {
				return {
					London: '伦敦',
					Tokyo: '东京'
				}[v]
			}
		}
	}
	return (
		<Chart scale={scale} padding={[30, 20, 50, 40]} autoFit height={320} data={data} interactions={['element-active']}>
			<Point position="month*temperature" color="city" shape='circle' />
			<Line shape="smooth" position="month*temperature" color="city" label="temperature" />
			<Tooltip shared showCrosshairs />
		</Chart>
	)
}

export default ChartIndex