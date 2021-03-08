import React from "react";
import ListItems from "./ListItems";
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
      activePage: 1
    };
    this.addItem = this.addItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.favouriteItem = this.favouriteItem.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
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
        }
      });
    }
  }
  searchItem(e) {
    e.preventDefault();
    const sitem = this.state.items.filter((val) =>
      val["text"]
        .toLowerCase()
        .includes(this.state.currentItem.text.toLowerCase())
    );
    this.setState({
      items: sitem
    });
  }

  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        flag: false
      }
    });
  }

  deleteItem(index) {
    if (window.confirm("Do you want to delete it")) {
      const filteredItems = this.state.items.filter(
        (item, ind) => ind !== index
      );
      this.setState({
        items: filteredItems
      });
    }
  }

  favouriteItem(index, toggle) {
    let ToggleItems = this.state.items.map((item, ind) =>
      ind === index ? { ...item, flag: toggle } : item
    );
    const favItem = ToggleItems.filter((item, ind) => item.flag === true);
    const Notfav = ToggleItems.filter((item, ind) => item.flag === false);
    let Re_Arranged = [];
    Re_Arranged = [...favItem, ...Notfav];
    this.setState({
      items: [...Re_Arranged]
    });
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  render() {
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
          <span class="material-icons icon" onClick={this.searchItem}>
            person_search
          </span>
        </form>

        <ListItems
          items={this.state.items}
          deleteItem={this.deleteItem}
          favouriteItem={this.favouriteItem}
        />
        <hr />
        <div className="pagination-div">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.state.items.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default FriendsList;
