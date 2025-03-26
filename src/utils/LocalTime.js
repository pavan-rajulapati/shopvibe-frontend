import React from 'react';
import { parseISO, format } from 'date-fns';

const LocalTime = ({ dateAndTime }) => {
    function convertTime(dateAndTime) {
        if (!dateAndTime) return "Invalid Date";
        const parsedDate = parseISO(dateAndTime);
        return format(parsedDate, "MMMM d, yyyy"); 
    }

    return <p>{convertTime(dateAndTime)}</p>;
};

export default LocalTime;
