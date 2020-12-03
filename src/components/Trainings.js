import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';



function Trainings() {

const [trainings, setTrainings] = useState([]);


useEffect(() => {
    getTrainings();
},[])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}


const columns = [
    
    {title: 'Activity', field: 'activity'},
    {title: 'Date', field: 'date', type: 'datetime', dateSetting: {locale: 'es-US'} },
    {title: 'Duration (min)', field: 'duration'},
    {title: 'Customer firstname', field: 'customer.firstname'},
    {title: 'Customer lastname', field: 'customer.lastname'}
   
]

const tableIcons ={
    Search: SearchIcon,
    FirstPage: FirstPageIcon,
    LastPage: LastPageIcon,
    Right: ChevronRightIcon,
    Left: ChevronLeftIcon,
    Clear: ClearIcon

}

return(
<div>
    <MaterialTable
    title="Trainings"
    columns={columns}
    key={trainings}
    data={trainings}
    options={{
         search:true,
        sorting: true,
        pagination: true
      }}
     icons={tableIcons}  
    />
</div>
);
};
export default Trainings;