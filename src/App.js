/* eslint-disable */
import Reach, { Component } from "react";
import dotenv from "dotenv";
import logo from "./logo.svg";
import "./App.css";

dotenv.config();

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currArtist: "",
      trackList: [1, 2, 3, 4, 5],
    };
  }

  async getList(e) {
    let trackList = await fetch(
      `http://api.musixmatch.com/ws/1.1/track.search?q_artist=${this.state.currArtist}&page_size=100&s_track_rating=desc&apikey=${process.env.APIKEY}`
    ).then((res) => res.json());
    console.log("trackList = ", trackList);
    this.setState({ trackList: trackList.message.body.track_list });
  }

  getArtistName(event) {
    this.setState({ currArtist: event.target.value });
  }

  async render() {
    return (
      <header>
        <div>
          <input
            type="text"
            onChange={this.getArtistName.bind(this)}
            placeholder="Search who you like"
          />
          <button onClick={this.getList.bind(this)}>검색</button>
        </div>
        <div>
          {this.state.trackList.map((value, index) => (
            <TrackList key={index} trackId={value.track_id}>
              {value.track_name}
            </TrackList>
          ))}
        </div>
      </header>
    );
  }
}

// 노래리스트
class TrackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackId: props.trackId,
      trackName: props.children,
    };
  }

  async getLyrics() {
    let haveLyrics = await fetch(
      `http://api.musixmatch.com/ws/1.1/track.lyrics.get?${this.state.trackId}&apikey=${process.env.APIKEY}`
    ).then((res) => res.json());
  }

  catchLyrics(event) {
    this.setState({ catchLyrics: event.target.value });
  }
  render() {
    return <a onClick={this.getLyrics.bind(this)}>{this.state.trackName}</a>;
  }
}

function App() {
  return (
    <div className="App">
      <SearchBox />
    </div>
  );
}

export default App;
/*
1. 검색창
 => input / button / click event
2. 노래리스트 
 => href / click event / print
3. 가사나오는 곳
 => clikc event / print / parseJson
*/
