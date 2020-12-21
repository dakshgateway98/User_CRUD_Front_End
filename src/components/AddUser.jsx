import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddUser(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const handleChange = (e) => {
    e.persist();
    setUser((prev) => {
      console.log(prev, "USER");
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };
  const validateUserName = (value) => {
    // const validEmailRegex = RegExp(
    //   /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    // );
    if (value) {
      if (value.trim().length < 5) {
        setUserNameErr("User name should be more than 5 character");
      } else {
        setUserNameErr("");
      }
    } else {
      {
        setUserNameErr("Please Enter UserName");
      }
    }
  };
  const validateEmail = (value) => {
    const validEmailRegex = RegExp(
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    );
    if (value) {
      if (validEmailRegex.test(value)) {
        setEmailErr("");
      } else {
        setEmailErr("Enter Valid Email Only");
      }
    } else {
      {
        setEmailErr("Please Enter Email");
      }
    }
  };
  const validateContact = (value) => {
    const validEmailRegex = RegExp(
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );
    if (value) {
      if (!validEmailRegex.test(value)) {
        setContactErr("Enter Valid Contact");
      } else {
        setContactErr("");
      }
    } else {
      {
        setContactErr("Please Enter Contact");
      }
    }
  };
  const handleAddUser = () => {
    axios
      .post("http://localhost:4444/user/", user)
      .then((res) => {
        if (res.status === 200) {
          props.history.push("/list");
        } else {
          alert("some thing went wrong");
        }
      })
      .catch((err) => {
        alert(err);
      });
    setUser({
      name: "",
      email: "",
      mobileNo: "",
    });
    console.log(user);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ADD USER
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  handleChange(e);
                  validateUserName(e.target.value);
                }}
                value={user.name}
                autoComplete="Name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
              <small className="form-text text-danger">{userNameErr}</small>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  validateEmail(e.target.value);
                }}
                value={user.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <small className="form-text text-danger">{emailErr}</small>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={(e) => {
                  handleChange(e);
                  validateContact(e.target.value);
                }}
                value={user.mobileNo}
                required
                fullWidth
                name="mobileNo"
                label="Mobile Number"
                type="mobileNo"
                id="mobileNo"
                autoComplete="mobileNo"
              />
              <small className="form-text text-danger">{contactErr}</small>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAddUser}
            disabled={
              !(
                emailErr === "" &&
                contactErr === "" &&
                userNameErr === "" &&
                user.name !== "" &&
                user.email !== "" &&
                user.mobileNo !== ""
              )
            }
          >
            ADD
          </Button>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
