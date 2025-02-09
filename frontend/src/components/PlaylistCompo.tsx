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
  console.log("data playlist +covers", playlist);

  return (
    <section className="playlist-container" aria-live="polite">
      <h3>DJ Claude <span className="spaned-words">recommends:</span></h3>
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
            <div className="song-info">
              <span className="spaned-words"> {song.title}</span > <em>BY</em> <span className="spaned-words">{song.artist}</span >
            </div>
              </a>
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
