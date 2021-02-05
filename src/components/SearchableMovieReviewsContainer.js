import React, { Component } from 'react';
import 'isomorphic-fetch';
import MovieReviews from './MovieReviews'

const NYT_API_KEY = 'dGpQ5OmGP2SgfvZimlpCUoF4iOag9qzZ';
const URL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?'
            + `api-key=${NYT_API_KEY}`;
                        

class SearchableMovieReviewsContainer extends Component{
    constructor() {
        super()
        this.state = {
            reviews: [],
            searchTerm: ""
        }
    }

    handleChange = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(URL + `&query=${this.state.searchTerm}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                reviews: data.results
            })
        })
    }

    render(){
        return(
            <div className="searchable-movie-reviews">
                <form onSubmit={event => this.handleSubmit(event)}>
                    <label>Search for Reviews:</label>
                    <input type="text"
                        onChange={event => this.handleChange(event)}></input>
                    <input type="submit"></input>
                </form>
                {this.state.reviews ? <MovieReviews reviews={this.state.reviews}/> : null }
            </div>
        )
    }
}

export default SearchableMovieReviewsContainer;
