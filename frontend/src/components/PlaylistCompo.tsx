import React from "react";
import "../style/PlaylistCompo.css";
// import ReactMarkdown from "react-markdown";

interface Song {
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface PlaylistProps {
  playlist: Song[];
}

const PlaylistCompo: React.FC<PlaylistProps> = ({ playlist }) => {
  console.log("here is what i want to retrieve +covers", playlist);

  return (
    <section className="playlist-container" aria-live="polite">
      <h1>DJ Claude recommends:</h1>
      {playlist && playlist.length > 0 ? (
          <ul className="playlist-list">
          {playlist.map((song, index) => (
            <li key={index} className="playlist-item">
               <a href={song.url} target="_blank" rel="noopener noreferrer" className="song-link">

            <img
              src={song.cover}
              alt={`${song.title}`}
              className="song-cover"
              loading="lazy"
            />
               </a>
            <div className="song-info">
              <strong>{index + 1}. {song.title}</strong> - <em>{song.artist}</em>
            </div>
          </li>
        ))}
      </ul>
    ) : (
        <p>No playlist available. Try generating one!</p>
      )}
    </section>
  );
};

export default PlaylistCompo;
