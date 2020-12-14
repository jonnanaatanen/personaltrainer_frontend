import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


function Kalenteri() {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    
    useEffect(() => {
    getTrainings();
}, []);

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setEvents(data))
        .catch(err => console.error(err))
};

return(
    <div>
        <h1>Calendar</h1>
        <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ height: 500 }}
  />
    </div>
)

}
export default Kalenteri;