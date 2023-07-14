/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from "react";
import axios from "axios";

class Menu extends React.Component {
  /**
   * Main constructor for the Menu Class
   * @memberof Menu
   */
  constructor() {
    super();
    this.state = {
      hasSearched: false,
      showingSearch: false,
      searchResults: [],
    };
  }

  componentDidMount() {
    this.setState({ searchResults: [] });
  }

  /**
   * Shows or hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  showSearchContainer(e) {
    e.preventDefault();
    this.setState({
      showingSearch: !this.state.showingSearch,
    });
  }

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  onSearch(e) {
    // Start Here
    const searchText = e.target.value;
    if (searchText.length > 0) {
      this.setState({ hasSearched: true });
      axios
        .get(`http://localhost:3035/search?q=${searchText}`)
        .then((response) => {
          // Handle search results here
          console.log(response.data);
          // update the state with the search results
          this.setState({ searchResults: response.data });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // if search text is empty, clear the search results
      this.setState({ searchResults: [], hasSearched: false });
    }
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  render() {
    return (
      <header className="menu">
        <div className="menu-container">
          <div className="menu-holder">
            <h1 className="pt-4">ELC</h1>
            <nav>
              <a href="#" className="nav-item">
                HOLIDAY
              </a>
              <a href="#" className="nav-item">
                WHAT'S NEW
              </a>
              <a href="#" className="nav-item">
                PRODUCTS
              </a>
              <a href="#" className="nav-item">
                BESTSELLERS
              </a>
              <a href="#" className="nav-item">
                GOODBYES
              </a>
              <a href="#" className="nav-item">
                STORES
              </a>
              <a href="#" className="nav-item">
                INSPIRATION
              </a>

              <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                <i className="material-icons search">search</i>
              </a>
            </nav>
          </div>
        </div>
        <div
          className={
            (this.state.showingSearch ? "showing " : "") + "search-container"
          }
        >
          <input type="text" onChange={(e) => this.onSearch(e)} />
          <a href="#" onClick={(e) => this.showSearchContainer(e)}>
            <i className="material-icons close">close</i>
          </a>

          {/* render search results */}
          {this.state.searchResults.length > 0 ? (
            <div className="content-search">
              {this.state.searchResults.map((result) => (
                <div className="card" key={result["_id"]}>
                  <img
                    className="card_img"
                    alt={result.name}
                    src={result.picture}
                  />
                  <div className="card_content">
                    <div className="card_title">{result.name}</div>
                    <div className="card_description">{result.about}</div>
                    <div className="card_footer">
                      <p className="price">${result.price}</p>
                      <div>
                        {result.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : this.state.hasSearched ? (
            <div className="zero-results">
              <h2 className="search-results__title">Search Results</h2>
              <div className="font-tstar-bold">
                No Results Found. We suggest double-checking the spelling,
                searching for a similar term.
              </div>
            </div>
          ) : null}
        </div>
      </header>
    );
  }
}

// Export out the React Component
export default Menu;
