import React from "react";
import Pagination from "react-js-pagination";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        flag: false
      },
      sitem: [],
      filterflag: false,
      activePage: 1,
      usersPerPage: 4
    };
    this.addItem = this.addItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.favouriteItem = this.favouriteItem.bind(this);
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];

      this.setState({
        items: items,
        currentItem: {
          text: "",
          flag: false
        },
        activePage: Math.ceil(items.length / this.state.usersPerPage)
      });
    }
  }

  searchItem() {
    const shitem = this.state.items.filter((val) =>
      val["text"]
        .toLowerCase()
        .includes(this.state.currentItem.text.toLowerCase())
    );

    this.setState({
      sitem: shitem,
      filterflag: true
    });
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        flag: false
      },
      filterflag: false
    });
  }

  deleteItem(index) {
    if (this.state.filterflag) {
      if (window.confirm("Do you want to delete it")) {
        const filteredItems = this.state.sitem.filter(
          (item, ind) => ind !== index
        );
        this.setState({
          sitem: filteredItems
        });
      }
    } else {
      if (window.confirm("Do you want to delete it")) {
        const filteredItems = this.state.items.filter(
          (item, ind) => ind !== index
        );
        this.setState({
          items: filteredItems
        });
      }
    }
  }

  favouriteItem(item, toggle) {
    if (this.state.filterflag) {
      let ToggleItems = this.state.sitem.map((val, ind) =>
        val === item ? { ...val, flag: toggle } : val
      );
      const favItem = ToggleItems.filter((item, ind) => item.flag === true);
      const Notfav = ToggleItems.filter((item, ind) => item.flag === false);
      let Re_Arranged = [];
      Re_Arranged = [...favItem, ...Notfav];
      this.setState({
        sitem: [...Re_Arranged]
      });
    } else {
      let ToggleItems = this.state.items.map((val, ind) =>
        val === item ? { ...val, flag: toggle } : val
      );
      const favItem = ToggleItems.filter((item, ind) => item.flag === true);
      const Notfav = ToggleItems.filter((item, ind) => item.flag === false);
      let Re_Arranged = [];
      Re_Arranged = [...favItem, ...Notfav];
      this.setState({
        items: [...Re_Arranged]
      });
    }
  }

  handleSetChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
    const lastUser = this.state.activePage * this.state.usersPerPage;
    const firstUser = lastUser - this.state.usersPerPage;
    const displayFriends = this.state.filterflag
      ? this.state.sitem
      : this.state.items.slice(firstUser, lastUser);

    return (
      <div className="content mx-auto mt-5">
        <h6 className="title">
          <b>Friends List</b>
        </h6>
        <form onSubmit={this.addItem}>
          <input
            type="text"
            className="add-section"
            placeholder="Enter your friend's name"
            value={this.state.currentItem.text}
            onChange={this.handleInput}
          />
          <span className="material-icons icon" onClick={this.searchItem}>
            person_search
          </span>
        </form>

        {/* Addfriend ... list......... */}

        <div>
          {displayFriends.length ? (
            <>
              {displayFriends.map((item, index) => (
                <div>
                  <hr style={{ margin: 0 }} />
                  <div className="row">
                    <div className="col-sm h-25 mt-1 ml-2">
                      <b>{item.text}</b>

                      <pre>is your friend</pre>
                    </div>

                    <div className="col-sm icon-style  mt-3">
                      {item.flag ? (
                        <span
                          className="material-icons"
                          onClick={() => {
                            this.favouriteItem(item, false);
                          }}
                        >
                          star
                        </span>
                      ) : (
                        <span
                          className="material-icons"
                          onClick={() => {
                            this.favouriteItem(item, true);
                          }}
                        >
                          star_outline
                        </span>
                      )}
                      <span
                        className="material-icons"
                        onClick={() => {
                          this.deleteItem(index);
                        }}
                      >
                        delete_outline
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p className="ml-2 mt-2">Not Found in List</p>
            </>
          )}
        </div>

        <hr />
        {/* pagination......... */}

        <div className="pagination-div">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.state.items.length}
            pageRangeDisplayed={7}
            hideFirstLastPages={"false"}
            prevPageText={"Prev"}
            nextPageText={"Next"}
            activeLinkClass={"paginationActive"}
            itemClassPrev={"prev-style"}
            itemClassNext={"next-style"}
            onChange={(pageNumber) => this.handleSetChange(pageNumber)}
          />
        </div>
      </div>
    );
  }
}

export default FriendsList;
