// const express = require('expree')
const cors = require("cors");
const jsonParser = require("body-parser");
import express from "express";
import axios from "axios";
import APIKEY from "./api";

const app = express();

app.use(cors());
app.use(jsonParser.json());

app.get("/musicList/:artistName", async (req, res) => {
  const { artistName } = req.params;

  // encodeURI 메소드를 사용하여 한글 치환
  axios
    .get(
      encodeURI(
        `http://api.musixmatch.com/ws/1.1/track.search?q_artist=${artistName}&page_size=100&s_track_rating=desc&apikey=${APIKEY}`
      )
    )
    .then((trackList) => {
      if (trackList.data.message.body.track_list.length === 0) {
        res.status(404).send();
        //res.status(404).send() -> status(404) send에 인자값으로 뭘 넣어줘도 send의 인자말고 살제 에러에 대한 문제가 클라이언트에게 보내진다.
        // 클라이언트에서 에러에 대한 것을 이용자가 이해할 수 있도록 커스텀해준다.(catch에서 커스텀)
      } else {
        res.status(200).send(trackList.data.message.body.track_list);
      }
    });
});

app.get("/music/:track_id", async (req, res) => {
  const { track_id } = req.params;

  let lyricsData = await axios
    .get(
      `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track_id}&apikey=${APIKEY}`
    )
    .then((res) => {
      if (res.data.message.body.lyrics) {
        return res.data.message.body.lyrics;
      } else {
        return {
          lyrics: "가사없음",
        }; // 클라이언트에서 fetch 메소드 요청시 api 서버에서 반환해줘야 되는 데이터타입은 객체여야한다???
      }
    });

  res.status(200).send(lyricsData);
});

app.listen(4000, () => {
  console.log("server starting... 4000");
});
