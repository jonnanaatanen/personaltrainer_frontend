import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
//import EditCustomer from './EditCustomer';
import Snackbar from '@material-ui/core/Snackbar';
import AddTraining from './AddTrraining';


function Customers() {

const [customers, setCustomers] = useState([]);
const [open, setOpen] = React.useState(false);
const [msg, setMsg] = useState('');


useEffect(() => {
    getCustomers();
},[])

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}


const deleteCustomer = (rowData) => {
    fetch(rowData.links[0].href, {
        method: 'DELETE'
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Customer was deleted succesfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
   }

const addCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {'Content-type' : 'application/json' },
        body: JSON.stringify(customer)      
      })
      .then(_ => getCustomers())
      .then(_ => setMsg('Customer was saved succesfully'))
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
}
const updateCustomer = (newData, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {'Content-type' : 'application/json' },
        body: JSON.stringify(newData)      
      })
      .then(_ => getCustomers())
      .then(_ => setMsg('Customer was updated succesfully'))
      .then(_ => setOpen(true))
      .catch(err => console.error(err))
}


const addTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {'Content-type': 'application/json' },
        body: JSON.stringify(training)
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Training saved succesfully'))
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
    Delete: DeleteIcon,
    Edit: EditIcon

}


return(
<div>
<div>
    <MaterialTable
    title="Customers"
    key={customers}
    data={customers}
    icons={tableIcons}
    options={{
        search:true,
        sorting: true,
        pagination: true
      }}
      editable={{
        onRowAdd: newData =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            addCustomer(newData)          
            resolve()
          }, 1000);
        }),
        onRowDelete: oldData =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
               deleteCustomer(oldData)
                resolve();
            }, 1000);
        }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateCustomer(newData, oldData.links[0].href)
              resolve()                 
            }, 1000);
          }),
      }}
     
     columns = {[
        {
        title: '', editable: 'never', field: 'links[0].href',
        render: rowData => <AddTraining  addTraining={addTraining} rowData={rowData}/>
        },
        {title: 'Firstname', field: 'firstname'},
        {title: 'Lastname', field: 'lastname'},
        {title: 'Streetaddress', field: 'streetaddress'},
        {title: 'Postcode', field: 'postcode'},
        {title: 'City', field: 'city'},
        {title: 'Email', field: 'email'},
        {title: 'Phone', field: 'phone'}
    ]}

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
export default Customers;