import React, { Component } from "react";

class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackId: props.trackId,
      trackName: props.children,
      lyrcis: "",
    };
  }

  getLyrics() {
    fetch(`http://localhost:4000/music/${this.state.trackId}`)
      .then((res) => res.json())
      .then((lyrics) => {
        this.setState({ lyrics });
        alert(this.state.lyrics.lyrics_body);
      });
  }

  catchLyrics(event) {
    this.setState({ catchLyrics: event.target.value });
  }
  render() {
    return <li onClick={this.getLyrics.bind(this)}>{this.state.trackName}</li>;
  }
}

export default TrackList;
