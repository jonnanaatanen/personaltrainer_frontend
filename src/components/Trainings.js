import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';


function Trainings() {

const [trainings, setTrainings] = useState([]);
const [open, setOpen] = React.useState(false);
const [msg, setMsg] = useState('');


useEffect(() => {
    getTrainings();
},[])

const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}

const deleteTraining = (rowData) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + rowData.id, {
        method: 'DELETE'
    })
    .then(_ => getTrainings())
    .then(_ => setMsg('Training was deleted succesfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
   }

const closeSnackbar = () => {
    setOpen(false);
}



const tableIcons ={
    Search: SearchIcon,
    FirstPage: FirstPageIcon,
    LastPage: LastPageIcon,
    Right: ChevronRightIcon,
    Left: ChevronLeftIcon,
    Clear: ClearIcon,
    Delete: DeleteIcon

}

return(
<div>
<div>
    <MaterialTable
    columns = {[
    
        {title: 'Activity', field: 'activity'},
        {title: 'Date', field: 'date', type: 'datetime'},
        {title: 'Duration (min)', field: 'duration'},
        {title: 'Firstname', field: 'customer.firstname'},
        {title: 'Lastname', field: 'customer.lastname'}
    ]}
    title="Trainings"
    key={trainings}
    data={trainings}
    options={{
         search:true,
        sorting: true,
        pagination: true
      }}
     icons={tableIcons}  
     editable={{
         onRowDelete: oldData =>
         new Promise((resolve, reject)=> {
         setTimeout(() => {   
         deleteTraining(oldData)
         resolve();
         }, 1000)    
         })
     }}
    />
</div>
<Snackbar
       open={open}
       autoHideDuration={3000}
       onClose={closeSnackbar}
       message={msg}
       />
</div>
);
};
export default Trainings;