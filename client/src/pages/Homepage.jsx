import axios from "axios";
import React, { PureComponent } from "react";
import { useEffect, useState } from "react";
import { parseISO, format } from "date-fns";
import {LineChart, Line, XAxis, YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,} from "recharts";
import customData from "../CustomData";

async function convertArrayToHour(array) {
    // Wrap the forEach in a Promise to handle asynchronous behavior
    await Promise.all(
        array.map(async (value) => {
            const dateObj = parseISO(value.createdAt);
            const formattedTime = format(dateObj, "HH:mm"); // Use 24-hour format
            value.day = formattedTime;
        })
    );
    return array;
}

async function filterDatesByDayOfWeekAsync(dates, dayOfWeek) {
    const filteredDates = await Promise.all(
        dates.map(async (date) => {
            const checkDate = new Date(date.createdAt);
            if (checkDate.getDay() === dayOfWeek) {
                return date;
            }
            return null;
        })
    );
    return filteredDates.filter((date) => date !== null);
}

export default function Homepage() {
    const [dates, setDates] = useState([]);
    const [datesWithHours, setDatesWithHours] = useState([]);
    const [wednesdays, setWednesdays] = useState([]);

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
        async function filterDates() {
            try {
                const wednesday = await filterDatesByDayOfWeekAsync(dates, 3);
                setWednesdays(wednesday);
                console.log("wednesdays", wednesday);
            } catch (error) {
                console.error("Error filtering dates:", error);
                setError("Error filtering dates");
            }
        }

        if (dates.length > 0) {
            filterDates();
        }
    }, [dates]);

    useEffect(() => {
        axios.get("/entries").then(async ({ data }) => {
            setDates(data);
            console.log("dates", dates);
        });
    }, []);

    customData.map(async (value) => {
        const dateObj = parseISO(value.time[0]);
        const formattedTime = format(dateObj, "hh:mm"); // Use 24-hour format
        value.time = formattedTime;
    });

    console.log("cd", customData);

    return (
        <div className="bg-primary">
            <div className="font-mono flex justify-center items-center pt-10">
                <LineChart width={600} height={400} data={customData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" reversed={true} scale={"auto"} />
                    <YAxis dataKey="occupancy" />
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
