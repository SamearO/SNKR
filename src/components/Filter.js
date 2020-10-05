import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "../components/imported/CustomButtons/Button.js";


// styling (CSS)
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

// filter component; houses code for the filter button
export const Filter = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  // this function handles the change in the size picker
  const handleChange = (event) => {
    console.log("handlechange", event);
    props.setSize(Number(event.target.value) || "");
  };

  // this function handles the change in the date picker
  const handleChange2 = (event) => {
    console.log("handleChange2", event);
    props.setEndDate(event.target.value);
  };

  const handleChange3 = (event) => {
    console.log('handlechange', event)
    props.setStartDate(event.target.value)
  }

  // this handles opening the box when the user clicks on select
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handles closing the box when the user selects cancel
  const handleClose = (event) => {
    setOpen(false);
    props.setSize(Number(event.target.value) || "");
  };

  // handles closing the box when the user selects ok
  const handleClose2 = (event) => {
    setOpen(false);
    console.log(props.size);
    props.setSize(props.size);
  };
  // logs the filter object
  console.log("Filter", props);

  // code that is rendered when the page loads
  return (
    <div>
      {/* html for filter button */}
      <Button onClick={handleClickOpen} round color="primary" >Filter</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        // when button closes call handleclose function
        onClose={handleClose}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Size</InputLabel>
              <Select
                native
                // value is equal to the size hook
                value={props.size}
                // on change call the handlChange function
                onChange={handleChange}
                input={<Input id="demo-dialog-native" />}
              >
                {/* values for the size button */}
                <option value={0}>All</option>
                <option value={7}>7</option>
                <option value={7.5}>7.5</option>
                <option value={8}>8</option>
                <option value={8.5}>8.5</option>
                <option value={9}>9</option>
                <option value={9.5}>9.5</option>
                <option value={10}>10</option>
                <option value={10.5}>10.5</option>
                <option value={11}>11</option>
                <option value={11.5}>11.5</option>
                <option value={12}>12</option>
                <option value={12.5}>12.5</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
              </Select>
            </FormControl>
            <TextField
            id="date"
            label="Start Date"
              type="date"
              // value is equal to the date hook
              defaultValue={props.startDate}
              className={classes.textField}
              // on change call the handleChange2 function
              onChange={handleChange3}
              InputLabelProps={{
                shrink: true,
              }}/>
            <TextField
              id="date"
              label="End Date"
              type="date"
              // value is equal to the date hook
              defaultValue={props.endDate}
              className={classes.textField}
              // on change call the handleChange2 function
              onChange={handleChange2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose2} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Filter;
