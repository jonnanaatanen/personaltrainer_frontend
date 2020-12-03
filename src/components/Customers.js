import React, {useState, useEffect, useRef} from 'react';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


function Customers() {

const [customers, setCustomers] = useState([]);



useEffect(() => {
    getCustomers();
},[])

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}


 const columns = [
    
    {title: 'Firstname', field: 'firstname'},
    {title: 'Lastname', field: 'lastname'},
    {title: 'Streetaddress', field: 'streetaddress'},
    {title: 'Postcode', field: 'postcode'},
    {title: 'City', field: 'city'},
    {title: 'Email', field: 'email'},
    {title: 'Phone', field: 'phone'}
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
    title="Customers"
    columns={columns}
    key={customers}
    data={customers}
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
export default Customers;