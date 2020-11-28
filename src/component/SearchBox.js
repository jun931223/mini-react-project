/* eslint-disable */
import React, { Component } from "react";
import TrackList from "./TrackList";

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currArtist: "",
      trackList: [],
      // 초기화면에 "가수명을 입력해주세요" 라는 문자열을 출력하기 위해 사용
      // 그리고 가수의 노래 데이터가 없을 때도 "가수명을 입력해주세요" 라는 문자열을 출력하기 위해 사용
      errorFlag: false,
    };

    //
    this.storage = [];

    this.getList = this.getList.bind(this);
    this.getArtistName = this.getArtistName.bind(this);
  }

  getList(e) {
    this.setState({ errorFlag: true });
    fetch(`http://localhost:4000/musicList/${this.state.currArtist}`)
      .finally(this.setState({ trackList: [] }))
      .then((res) => res.json())
      .then((data) => {
        this.storage.push({
          artistName: this.state.currArtist,
          resultData: data,
        });
        this.setState({ trackList: data });
      })
      .catch((error) => {
        alert("there is no " + this.state.currArtist);
        if (this.storage.length === 0) {
          this.setState({ errorFlag: false });
        } else {
          this.setState({
            trackList: this.storage.resultData[
              this.storage.resultData.length - 1
            ],
          });
        }
      });
  }

  getArtistName(event) {
    this.setState({ currArtist: event.target.value });
  }

  render() {
    console.log(this.storage);
    return (
      <>
        <header>
          <div>
            <input
              className="searchMusic"
              type="text"
              // onKeyPress={this.getList}
              onChange={this.getArtistName}
              placeholder="Search who you like"
            />
            <button onClick={this.getList}>검색</button>
          </div>
        </header>
        {this.state.errorFlag ? (
          <ul className="trackList">
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
        ) : (
          <h1>가수명을 입력하세요</h1>
        )}
      </>
    );
  }
}

export default SearchBox;
