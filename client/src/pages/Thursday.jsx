import axios from "axios";
import React, { PureComponent } from "react";
import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import {ScatterChart, LineChart, Line, XAxis, YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from "recharts";
import customData from "../CustomData";


async function convertArrayToHour(array) {
    await Promise.all(
        array.map(async (value) => {
            const dateObj = parseISO(value.createdAt);
            const formattedTime = format(dateObj, "HH:mm"); // Use 24-hour format
            value.day = formattedTime;
        })
    );
    return array;
}

export default function Thursday() {
    const [dates, setDates] = useState([]);
    const [datesWithHours, setDatesWithHours] = useState([]);

    useEffect(() => {
        async function addHours() {
            try {
                const finished = await convertArrayToHour(dates);
                setDatesWithHours(finished);
                console.log("with hours", datesWithHours);
            } catch (error) {
                console.error("Error filtering dates:", error);
                setError("Error filtering dates");
            }
        }

        if (dates.length > 0) {
            addHours();
        }
    }, [dates]);


    useEffect(() => {
        axios.get("/entries/thursday").then(async ({ data }) => {
            setDates(data);
            console.log("dates", dates);
        });
    }, []);

    return (
        <div className="bg-primary">
            <div>thursday</div>
            <div className="font-mono flex justify-center items-center mt-10">
                <LineChart width={600} height={400} data={datesWithHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stamp" scale={"auto"} domain={['04:00', '22:00']} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="occupancy"
                        stroke="#82ca9d"
                    />
                </LineChart>
            </div>
        </div>
    );
}
