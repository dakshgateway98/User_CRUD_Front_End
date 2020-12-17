import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  DeleteOutlined,
  EditAttributesRounded,
  EditRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function UserCardList({
  ListOfUser,
  ListOfImage,
  handleLocalDelete,
  history,
}) {
  const classes = useStyles();
  console.log(ListOfImage, "ListOfImage");
  const handleDelete = (mid, index) => {
    const obj = {
      id: mid,
    };
    handleLocalDelete(index);
    console.log("handle Delete");
    axios
      .post("http://localhost:4444/user/delete", obj)
      .then((res) => {
        if (res.status === 200) {
          console.log("Sucess");
        } else {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        alert("something went wrong");
      });
  };

  return (
    <List className={classes.root}>
      {ListOfUser.map((user, index) => {
        return (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ListOfImage[index % 5]} />
              </ListItemAvatar>

              <ListItemText
                primary={user.name}
                secondary={
                  <React.Fragment>
                    <div>
                      <b>Email :</b> {user.email}
                    </div>
                    <div>
                      <b>Mobile Number:</b> {user.mobileNo}
                    </div>
                    {/* <div><b>abv :</b> {bear.abv}</div>
                    {bear.ibu && <div><b>ibu :</b> ${bear.ibu}</div>} */}
                  </React.Fragment>
                }
              />
              <div
                onClick={() => {
                  handleDelete(user._id, index);
                }}
              >
                <DeleteOutlined />
              </div>
              <Link to="/edit">
                <div
                  onClick={async () => {
                    await localStorage.setItem("editId", user._id);
                    //history.push('/edit')
                  }}
                >
                  <EditRounded />
                </div>
              </Link>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
