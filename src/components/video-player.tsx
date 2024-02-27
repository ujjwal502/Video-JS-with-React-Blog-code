import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import SpeedControl from "./speed-control";

export const VideoPlayer = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const { options, onReady } = props;
  const [notes, setNotes] = useState<{ time: number; text: string }[]>([]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.playbackRate(playbackRate);
    }
  }, [playbackRate]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const addNote = (noteText: string) => {
    const currentTime = playerRef.current.currentTime();
    setNotes([...notes, { time: currentTime, text: noteText }]);
  };

  console.log("notes", notes);

  return (
    <>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Add a note..."
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && e.target.value) {
              addNote(e.target.value);
              e.target.value = ""; // Clear input after adding
            }
          }}
        />
        {notes.length > 0 &&
          notes.map((note, idx) => {
            return (
              <div style={{ marginTop: "20px" }} key={idx}>
                <span>At {note.time} :- </span>
                <span>{note.text}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default VideoPlayer;
