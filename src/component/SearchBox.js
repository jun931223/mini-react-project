/* eslint-disable */
import React, { Component } from "react";
import TrackList from "./TrackList";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currArtist: "",
      trackList: [],
    };
    this.flag = false;
    this.getList = this.getList.bind(this);
    this.getArtistName = this.getArtistName.bind(this);
  }

  getList(e) {
    this.flag = true;
    fetch(`http://localhost:4000/musicList/${this.state.currArtist}`)
      .finally(this.setState({ trackList: [] }))
      .then((res) => res.json())
      .then((data) => {
        this.setState({ trackList: data });
      });
  }

  getArtistName(event) {
    this.setState({ currArtist: event.target.value });
  }

  render() {
    if (!this.flag) {
      return (
        <>
          <header>
            <div>
              <input
                className="searchMusic"
                type="text"
                onKeyPress={this.getList}
                onChange={this.getArtistName}
                placeholder="Search who you like"
              />
              {/* <button onClick={this.getList}>검색</button> */}
            </div>
          </header>

          <h1>가수명을 입력하세요</h1>
        </>
      );
    }
    return (
      <>
        <header>
          <div>
            <input
              className="searchMusic"
              type="text"
              onKeyPress={this.getList}
              onChange={this.getArtistName}
              placeholder="Search who you like"
            />
            {/* <button onKeyPress={this.getList}>검색</button> */}
          </div>
        </header>
        <span className="trackList">
          <ul>
            {this.state.trackList.length !== 0 ? (
              this.state.trackList.map((value, index) => (
                <TrackList key={index} trackId={value.track.track_id}>
                  {value.track.track_name}
                </TrackList>
              ))
            ) : (
              <img
                src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif"
                width="300"
              />
            )}
          </ul>
        </span>
      </>
    );
  }
}

export default SearchBox;
