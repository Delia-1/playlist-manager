import "../style/PlaylistCompo.css"
import PropTypes from "prop-types";
// import ReactMarkdown from "react-markdown";



export default function Playlist({playlist}) {
console.log( "here is what i want to retrieve",   playlist)




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
                  <strong>{index + 1}. {title}</strong> - <em>{artist}</em>
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
}

Playlist.propTypes = {
  playlist: PropTypes.array.isRequired,
};
