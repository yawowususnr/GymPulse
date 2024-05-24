import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import moment from 'moment';
import { scaleTime } from 'd3-scale';
import * as d3 from 'd3';

const data = [
  {
    "_id": "6650425ab7026b1e0c71b7f2",
    "occupancy": 123,
    "createdAt": "2024-05-24T07:31:38.336Z",
    "updatedAt": "2024-05-24T07:31:38.396Z",
    "__v": 0,
    "day": "Friday",
    "stamp": "02:31"
  },
  {
    "_id": "66504260b7026b1e0c71b7f5",
    "occupancy": 167,
    "createdAt": "2024-05-24T07:31:44.346Z",
    "updatedAt": "2024-05-24T07:31:44.395Z",
    "__v": 0,
    "day": "Friday",
    "stamp": "02:31"
  },
  {
    "_id": "66504264b7026b1e0c71b7f8",
    "occupancy": 203,
    "createdAt": "2024-05-24T07:31:48.479Z",
    "updatedAt": "2024-05-24T07:31:48.525Z",
    "__v": 0,
    "day": "Friday",
    "stamp": "02:31"
  },
  {
    "_id": "665042e7c62ecd81d9d37608",
    "occupancy": 215,
    "createdAt": "2024-05-24T07:33:59.615Z",
    "updatedAt": "2024-05-24T07:33:59.675Z",
    "__v": 0,
    "day": "Friday",
    "stamp": "02:33"
  },
  {
    "_id": "66504c82e76e8b8b5ed498b8",
    "occupancy": 188,
    "createdAt": "2024-05-24T08:14:58.912Z",
    "updatedAt": "2024-05-24T08:14:58.990Z",
    "__v": 0,
    "day": "Friday",
    "stamp": "03:14"
  }
]

const dateExtent = d3.extent(data, d => new Date(d.createdAt));
const dateFormatter = date => {
  // return moment(date).unix();
  return moment(date).format('HH:mm');
};
const x = d3.scaleTime([new Date(2024, 5, 23), new Date(2024, 5, 25)], [0, 960]);

const Testpage = () => {
  return (
<LineChart width={600} height={300} data={data}>
  <Line type="monotone" dataKey="occupancy" stroke="black" strokeWidth={2} dot={false} />
  <CartesianGrid stroke="#ccc" />
  <YAxis dataKey="occupancy" />
  <XAxis
    dataKey='createdAt'
    domain={['auto', 'auto']}
    type='number'
    tickFormatter={dateFormatter}
  />
</LineChart>
  );
};

export default Testpage;
