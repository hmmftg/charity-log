// src/components/PatientList.js
import React from 'react';
import { List, Datagrid, TextField } from '@refinedev/mui';

const PatientList = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="dob" />
                <TextField source="contact_info" />
            </Datagrid>
        </List>
    );
};

export default PatientList;
