import React from 'react';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';


export const emailButton = (props) => {
    return(
      <form noValidate>
        <div>
          <TextField
            error
            id="standard-error-helper-text"
            label="Error"
            defaultValue="Use ME"
            helperText="Incorrect entry."
          />
        </div>
      </form>
    )
}

export default emailButton