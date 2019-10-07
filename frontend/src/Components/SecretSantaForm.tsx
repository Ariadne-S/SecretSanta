import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
//import LoadingOverlay from 'react-loading-overlay';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '600px',
        minWidth: '300px',
        margin: '10px auto auto',
        padding: '10px',
        backgroundColor:' #fff',
        boxSizing: 'border-box',
        border: '1px solid #eaeaea',
        flexDirection: 'column',
        flex: '1 1 auto',
    },

    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: "auto",
    },

    dense: {
        marginTop: 19,
    },

    button: {
        margin: theme.spacing(1),
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    dividerMargin: {
        marginTop: '35px',
    },

}));

interface SecretSantaParticipant {
    id: number,
    participantName: string,
    participantEmail: string,
    relationships: string[],
}

interface SecretSantaData {
    eventName: string,
    eventDate: Date | null,
    eventLocation: string,
    participants: SecretSantaParticipant[],
}

interface SecretSantaState {
    status: 'pending' | 'sending' | 'sent' | 'failed'
    data: SecretSantaData
    error?: any
}

const emptyParticipant = {
    id: 0,
    participantName: '',
    participantEmail: '',
    relationships: [],
};

export default function SecretSantaRequest() {
    const classes = useStyles();
    const baseUrl = "http://localhost:5000";
    const [state, setState] = useState<SecretSantaState>({
        status: 'pending',
        data: {
            eventName: '',
            eventDate:  new Date(),
            eventLocation: '',
            participants: [emptyParticipant],
        }
    });

    const handleChange = (name: string) =>(event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            data: {
                ...state.data,
                [name]: event.target.value
            }
        });
    };

    const handleDateChange = (date: Date | null) => {
        setState({
            ...state,
            data: {
                ...state.data,
                eventDate: date
            }
        });
    };

    const handleParticipantNameChange = (participant: SecretSantaParticipant, value: string) => {
        setState({
            ...state,
            data: {
                ...state.data,
                participants: state.data.participants.map(p => {
                    return p.id === participant.id ? 
                        {...p, participantName: value} :
                        p
                })
            }
        });
    };

    const handleParticipantEmailChange = (participant: SecretSantaParticipant, value: string) => {
        setState({
            ...state,
            data: {
                ...state.data,
                participants: state.data.participants.map(p => {
                    return p.id === participant.id ?
                        {...p, participantEmail: value} :
                        p
                })
            }
        });
    };

    const handleAddParticipant = () => {
        setState({
            ...state,
            data: {
                ...state.data,
                participants: [...state.data.participants, {...emptyParticipant, id: state.data.participants.length}]
            }
        });
    };

    async function sendRequest() 
    {
        try 
        {
            setState({...state, status: 'sending'});
            const request = await axios.post(`${baseUrl}/api/santa`, state.data);
            setState({...state, status: 'sent'});
        } catch (ex) {
            setState({...state, status: 'failed', error: ex});
        }
    }
    
    
    
    return (
        <form onSubmit={sendRequest} className={classes.container} noValidate autoComplete="on">
          <TextField
            id="eventName"
            label="Event Name"
            className={classes.textField}
            value={state.data.eventName}
            onChange={handleChange('url')}
            margin="normal"
          />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <TextField
                    id="eventLocation"
                    label="Event Location"
                    className={classes.textField}
                    value={state.data.eventLocation}
                    onChange={handleChange('eventLocation')}
                    margin="normal"
                  />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={state.data.eventDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Divider variant="fullWidth" className={classes.dividerMargin}/>
            
            <Grid container justify="space-around">
                {state.data.participants.map(p => 
                   <div key={p.id}>
                        <TextField
                            id="participantName"
                            label="Participant Name"
                            className={classes.textField}
                            value={p.participantName}
                            onChange={(e) => handleParticipantNameChange(p, e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            id="participantEmail"
                            label="Participant Email"
                            className={classes.textField}
                            value={p.participantEmail}
                            onChange={(e) => handleParticipantEmailChange(p, e.target.value)}
                            margin="normal"
                        />
                   </div>
                )}
            </Grid>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleAddParticipant} >
                Add another participant
            </Button>
            


            <Button variant="contained" color="primary" className={classes.button} onClick={sendRequest} >
                Shuffle and send results.
            </Button>
        </form>
        
    );
        
}