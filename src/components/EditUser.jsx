import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function EditUser(props) {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileNo: "",
  });
  const [userNameErr, setUserNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [contactErr, setContactErr] = useState("");
  const [flag, setFlag] = useState(true);
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
  const handleEditUser = () => {
    const obj = {
      id: localStorage.getItem("editId"),
      ...user,
    };
    console.log(obj, "OBJ For edit");
    axios
      .post("http://localhost:4444/user/update", obj)
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
    // console.log(user);
  };
  useEffect(() => {
    if (flag) {
      setFlag(false);
      const obj = {
        id: localStorage.getItem("editId"),
      };
      axios
        .post(`http://localhost:4444/user/getById`, obj)
        .then(async (res) => {
          // console.log(res, "Edit User");
          setUser((prev) => {
            return {
              name: res.data.name,
              email: res.data.email,
              mobileNo: res.data.mobileNo,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          EDIT USER
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
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEditUser}
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
            EDIT
          </Button>
        </form>
      </div>
    </Container>
  );
}
