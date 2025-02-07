import React from "react";
import "../style/PlaylistCompo.css";
// import ReactMarkdown from "react-markdown";

interface PlaylistProps {
  playlist: [string, string][];
}

const PlaylistCompo: React.FC<PlaylistProps> = ({ playlist }) => {
  console.log("here is what i want to retrieve", playlist);

  return (
    <section className="suggested-playlist-container" aria-live="polite">
      <h1>DJ Claude recommends:</h1>
      {playlist && Array.isArray(playlist) ? (
        <ul className="playlist-list">
          {playlist.map((songArray, index) => {
            if (Array.isArray(songArray) && songArray.length === 2) {
              const [title, artist] = songArray;

              return (
                <li key={index} className="playlist-item">
                  <strong>
                    {index + 1}. {title}
                  </strong>{" "}
                  - <em>{artist}</em>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      ) : (
        <p>No playlist available. Try generating one!</p>
      )}
    </section>
  );
};

export default PlaylistCompo;
