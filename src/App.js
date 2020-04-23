  import React, { Component } from 'react';
  import axios from 'axios';
  import './App.css';

  import * as Constants from './Constants'
  import ProductSummary from './ProductSummary/ProductSummary';
  import ProductDetails from './ProductDetails/ProductDetails';

  class App extends Component {

    newItemTemplate = {
      id: '',
      name: '',
      description: '',
      price: '',
      color: '',
      rating: '',
      quantity: ''
    }

    state = {
      itemSummaries: [],
      selectedItem: null,
      fetchError: false,
      currentPage: 0,
      totalPages: 0,
      sortKey: -1
    }

    fetchProductSummaries = (page, sortKey) => {
      axios.get(Constants.API_ITEMS + "?page=" + page + "&sortKey=" + sortKey)
        .then(response => {
          this.setState(
            {
              itemSummaries: response.data.content,
              totalPages: response.data.totalPages,
              selectedItem: null
            });
        })
        .catch(error => {
          this.setState({
            fetchError: true
          })
        })
    }

    onClickHandler = (id) => {
      //Again we use axios to make the GET request
      axios.get(Constants.API_ITEMS + id)
        .then(response => {
          this.setState(
            {
              selectedItem: response.data
            });
        })
    }

    deleteProductHandler = (id) => {
      axios.delete(Constants.API_ITEMS + id)
        .then(response => {
          this.fetchProductSummaries(0);
        })
    }

    newProductHandler = () => {
      //set the selectedWine in the state to the newWineTemplate which will clear the fields
      this.setState({ selectedItem: this.newItemTemplate });
    }

    //This function handles the onChange events from the input fields in the WineDetails component.
    //This function needs the original event information to know which input has changed (i.e. the target of the event)
    //hense we pass the event as a parameter
    wineDetailsChangedHandler = (event) => {
      const updatedSelectedWine = { ...this.state.selectedItem };
      updatedSelectedWine[event.target.name] = event.target.value;
      this.setState({ selectedItem: updatedSelectedWine });
    }

    saveWineHandler = (id) => {
      if (id) {
        axios.put(Constants.API_ITEMS, this.state.selectedItem)
          .then(response => {
            //again after updating we'll refresh our list of wine summaries from the wine-manager service
            this.fetchProductSummaries(this.state.currentPage, this.state.sortKey);
          });
      }
      //remember our Id text input field is disabled so when new is clicked it will be empty always!
      else {
        //again we use axios to send the POST request. This time the second parameter is the data that will be
        //sent in the body of the HTTP request. In this case it will be our selectedWine from our state.
        axios.post(Constants.API_ITEMS, this.state.selectedItem)
          .then(response => {
            //again after updating we'll refresh our list of wine summaries from the wine-manager service
            this.fetchProductSummaries(0, this.state.sortKey);
          });
      }
    }

    //This is one of the component lifecycle events that we can override. We'll use this to make our initial call
    //to our wine-manager REST api once the App component has beem mounted into the DOM and is ready for updates.
    componentDidMount() {
      this.fetchProductSummaries(0, this.state.sortKey);
    }

    onNextPageClickHandler = () => {

      if (this.state.currentPage < this.state.totalPages - 1) {
        this.state.currentPage++
        this.fetchProductSummaries(this.state.currentPage, this.state.sortKey)
      }

    }
    onPreviousPageClickHandler = () => {
      if (this.state.currentPage > 0) {
        this.state.currentPage--
        this.fetchProductSummaries(this.state.currentPage, this.state.sortKey)
      }

    }
    handleChange = (event) => {
      let sortKey = event.target.value
      this.state.sortKey = sortKey
      this.state.currentPage = 0
      this.fetchProductSummaries(this.state.currentPage, sortKey)
    }
    //in a class based component this is the only method that needs to be overridden. It should return the 
    //React component that will be rendered to represent this component. This is typically some JSX which will be
    //transpiled to JavaScript so that it can run in any browser.
    render() {
      let wineSummariesList = <p>Unable to fetch Product summaries</p>
      let pageTagDisplay = this.state.currentPage + 1
      let totalPagesDisplay = this.state.totalPages
      wineSummariesList = this.state.itemSummaries.map(wineSummary => {
        return <ProductSummary
          key={wineSummary.id}
          id={wineSummary.id}
          description={wineSummary.description}
          name={wineSummary.name}
          price={wineSummary.price}
          rating={wineSummary.rating}
          clickHandler={() => this.onClickHandler(wineSummary.id)}
        />
      })

      //similarly for our wineDetails component we initially set it to a message field asking to select a wine summary
      let wineDetails
      //if a wine summary has been selected
      if (this.state.selectedItem) {
        //we update the wineDetails variable with the new <WineDetails/> react component
        wineDetails = <ProductDetails item={this.state.selectedItem}
          valueChanged={(event) => this.wineDetailsChangedHandler(event)}
          deleteClickHander={() => this.deleteProductHandler(this.state.selectedItem.id)}
          saveClickHander={() => this.saveWineHandler(this.state.selectedItem.id)}
          newClickHander={() => this.newProductHandler()} />
      }
      return (
        <div style={divStyle}>
          <div>
            <h1>E-Shop Product List</h1>
            Sort by &nbsp;
            <select onChange={this.handleChange}>
              <option value="0">Cheapest Price</option>
              <option value="1">Highest Price</option>
              <option value="2">Good Ratings</option>
              <option value="3">Poor Ratings</option>
            </select>
            {wineSummariesList}
            <div>
              <button id="previous" onClick={() => this.onPreviousPageClickHandler()}>Previous</button>
          &nbsp; {pageTagDisplay} / {totalPagesDisplay} &nbsp;
          <button id="next" onClick={() => this.onNextPageClickHandler()}>Next</button>
            </div>
          </div>

          <div style={style2}>

            {wineDetails}
          </div>
        </div>
      );
    }
  }
  const divStyle = {
    display: 'flex',
    width: '150vh'
  };

  const style2 = {
    alignItems: 'center',
    width: '100vh',
    marginTop: '25vh',
    marginLeft: '20vh'
  }
  //like our other custom components we export our App for use elsewhere.
  export default App;
