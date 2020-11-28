import React, { Component } from "react";

class FlagOn extends Component {
  render() {
    return (
      <>
        <header>
          <div>
            <input
              className="searchMusic"
              type="text"
              onChange={this.getArtistName.bind(this)}
              placeholder="Search who you like"
            />
            <button onClick={this.getList.bind(this)}>검색</button>
          </div>
        </header>

        <h1>가수명을 입력하세요</h1>
      </>
    );
  }
}

class FlagOff extends Component {
  render() {
    return (
      <>
        <header>
          <div>
            <input
              className="searchMusic"
              type="text"
              onChange={this.getArtistName.bind(this)}
              placeholder="Search who you like"
            />
            <button onClick={this.getList.bind(this)}>검색</button>
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

export default FlagOn;
export default FlagOff;
