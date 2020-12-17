import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import axios from "axios";
import ReadMoreAndLess from "react-read-more-less";
import ReactPaginate from "react-paginate";
import UserCardList from "./UserCardList";
import { CircularProgress } from "@material-ui/core";
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfUsers: [],
      bearErr: "",
      Images: [
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://i.pinimg.com/originals/e5/6b/79/e56b799b365e63c41041feb38fb7e965.jpg",
        "https://i.guim.co.uk/img/media/d16c513f1379933437dbd424f891bb4da7fbca92/408_79_3160_1896/master/3160.jpg?width=700&quality=85&auto=format&fit=max&s=e6054da8e02530c6ece1d1aa314f6b7e",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1198110979.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDYNzU3h-_FCu56WuigrIstgabN-SjkXR-g&usqp=CAU",
      ],

      loading: true,
      error: "",
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      search: "",
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };
  receivedData = () => {
    axios
      .get(`http://localhost:4444/user/`)
      .then(async (res) => {
        var json = res.data;
        const data = json.filter((item) => {
          return item.name
            .trim()
            .toLowerCase()
            .includes(this.state.search.trim().toLowerCase());
          // return item.name.indexOf(this.state.search) > -1
        });
        const listOfUsers = data.slice(
          this.state.offset,
          this.state.offset + this.state.perPage
        );

        await this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          listOfUsers: listOfUsers,
        });

        this.setState({
          loading: false,
        });
      })

      .catch((err) => {
        this.setState({
          bearErr: err,
        });
        console.error(err);
      });

    //sorting Logic
    let tempData = this.state.listOfUsers;
    tempData.sort((a, b) =>
      a.name !== b.name ? (a.name > b.name ? -1 : 1) : 0
    );
    this.setState({
      listOfUsers: tempData,
    });
  };
  handleDelete = (index) => {
    console.log("handleLocalDelete", index);
    if (index > -1) {
      let listUser = this.state.listOfUsers;
      listUser.splice(index, 1);
      this.setState({
        listOfUsers: listUser,
      });
    }
  };
  componentDidMount() {
    this.receivedData();
  }

  render() {
    const {
      listOfUsers,
      loading,
      error,
      imageLoading,
      Images,
      search,
      bearErr,
    } = this.state;
    if (loading) {
      return <CircularProgress style={{ textAlign: "center" }} />;
    } else if (error !== "" || bearErr !== "") {
      return <div>{error}</div>;
    } else {
      return (
        <div className="content">
          <div className="container">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h5 className="mr-2 mt-1" style={{ display: "flex" }}>
                Enter Brand Name :
              </h5>
              <input
                onChange={async (e) => {
                  await this.setState({
                    search: e.target.value,
                  });
                  this.receivedData();
                }}
                type="text"
                style={{
                  width: "47%",
                  display: "flex",
                  justifyContent: "center",
                }}
                value={search}
              />
            </div>
            <div className="d-flex row " style={{ justifyContent: "center" }}>
              <UserCardList
                ListOfImage={Images}
                ListOfUser={listOfUsers}
                handleLocalDelete={this.handleDelete}
              />
            </div>
            <ReactPaginate
              previousLabel={"PREV"}
              nextLabel={"NEXT"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      );
    }
  }
}
export default ListUser;
