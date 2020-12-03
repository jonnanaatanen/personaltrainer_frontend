import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Customers from './Customers';
import Trainings from './Trainings';

function TabApp() {

const [value, setValue] = useState('one');

const handleChange = (event, value) => {
    setValue(value);
};

    return(
        <div>
     <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
          <Tab value="two" label="Trainings" />
        </Tabs>
      </AppBar>
      {value === 'one' && <div><Customers/></div>}
      {value === 'two' && <div><Trainings/></div>}
        </div>
    );
};

export default TabApp;