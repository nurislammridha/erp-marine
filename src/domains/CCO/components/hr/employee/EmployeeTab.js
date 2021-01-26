
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { GetEmployeeTabIndex } from '../../../_redux/actions/EmployeeAction';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const EmployeeTab = withRouter(({ history, props }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [intEmployeeId, setIntEmployeeId] = React.useState(undefined);

    const tabIndex = useSelector((state) => state.employeeInfo.tabIndex);
    const handleChange = (event, newValue) => {
        dispatch(GetEmployeeTabIndex(newValue));
        // // setValue(newValue);
        if (newValue === 0) {
            // Check if route is for edit or not

            if (typeof intEmployeeId !== 'undefined' && intEmployeeId != null) {
                // if edit push edit routes
                historyPush("/employee/employee-edit/" + intEmployeeId, ({ props: props.location.state }));
            } else {
                // push add routes
                historyPush("/employee/employee-add");
            }

        } else if (newValue === 1) {
            // historyPush("/employee/employee-education-add/" + intEmployeeId);
            if (typeof intEmployeeId !== 'undefined' && intEmployeeId != null) {
                // if edit push edit routes
                historyPush("/employee/employee-education-edit/" + intEmployeeId);
            } else {
                // push add routes
                historyPush("/employee/employee-education-add/");
            }
        } else if (newValue === 2) {
            if (typeof intEmployeeId !== 'undefined' && intEmployeeId != null) {
                historyPush("/employee/employee-record-list/" + intEmployeeId);
            } else {
                historyPush("/employee/employee-record-add/" + intEmployeeId);
            }
        } else if (newValue === 3) {
            if (typeof intEmployeeId !== 'undefined' && intEmployeeId != null) {
                historyPush("/employee/employee-documents-list/" + intEmployeeId);
            } else {
                historyPush("/employee/employee-documents-add/" + intEmployeeId);
            }

        } else if (newValue === 4) {
            historyPush("/employee/employee-certificates-add/" + intEmployeeId);
        } else if (newValue === 5) {
            historyPush("/employee/employee-bank-details-add/" + intEmployeeId);
        } else if (newValue === 6) {
            historyPush("/employee/employee-reference-add/" + intEmployeeId);
        }
    }

    function historyPush(url) {
        history.push(url);
    }

    useEffect(() => {
        if (history.location.pathname !== '/employee/employee-add') {
            setIntEmployeeId(props.match.params.intEmployeeId);
            setIsEditMode(true);
        }
    }, [props]);

    return (
        <Paper className={classes.root}>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
            // centered
            >
                {/* {!isEditMode ? 'disabled' : ''} */}
                <Tab label="Personal" />
                <Tab label="Education" disabled={isEditMode ? false : true} />
                <Tab label="Record" disabled={isEditMode ? false : true} />
                <Tab label="Document" disabled={isEditMode ? false : true} />
                <Tab label="Certificates" disabled={isEditMode ? false : true} />
                <Tab label="Bank Details" disabled={isEditMode ? false : true} />
                <Tab label="Reference" disabled={isEditMode ? false : true} />
            </Tabs>
        </Paper>
    );
});

export default EmployeeTab;
