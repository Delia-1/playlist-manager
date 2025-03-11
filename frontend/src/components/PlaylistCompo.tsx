import React, { useState, useRef } from "react";
import "../style/PlaylistCompo.css";

interface Song {
  title: string;
  artist: string;
  cover: string;
  url: string;
  preview: string;
}

interface PlaylistProps {
  playlist: Song[];
}

const PlaylistCompo: React.FC<PlaylistProps> = ({ playlist }) => {
  console.log("data playlist + covers", playlist);

  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // 🎵 Toggle play/pause for song
  const togglePlay = (preview: string) => {
    if (currentSong === preview) {
      audioRef.current?.pause();
      setCurrentSong(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = preview;
        audioRef.current.play();
      }
      setCurrentSong(preview);
    }
  };

  // ❤️ Toggle favorite status
  const toggleHeart = (preview: string) => {
    setFavorites((prev) => ({
      ...prev,
      [preview]: !prev[preview],
    }));
  };

  return (
    <section className="playlist-container" aria-live="polite">
      <h3 className="dj-text">
        DJ Claude <span className="colored-spaned-words">recommends:</span>
      </h3>

      {/* 🎵 Global Audio Player (Hidden) */}
      <audio ref={audioRef} controls hidden>
        <source src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* 🎶 Playlist Songs */}
      {playlist && playlist.length > 0 ? (
        <ul className="playlist-list">
          {playlist.map((song, index) => (
            <li key={index}>
              <div className={`card ${currentSong === song.preview ? "playing" : ""}`}>
                <div className="one">
                  {/* 🎵 Song Cover */}
                  <div className="cover">
                    <img
                      src={song.cover}
                      alt={`${song.title}`}
                      className="song-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* 🎤 Song & Artist Name */}
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>

                  {/* 🎛️ Controls Bar */}
                  <div className="bar">
                    {/* ❤️ Favorite Heart */}
                    <svg
                      onClick={() => toggleHeart(song.preview)}
                      viewBox="0 0 16 16"
                      className={`color1 bi ${favorites[song.preview] ? "bi-suit-heart-fill" : "bi-suit-heart"}`}
                      fill="currentColor"
                      height="16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"
                      ></path>
                    </svg>

                    {/* ▶️ Play / Pause Button */}
                    <svg
                      onClick={() => togglePlay(song.preview)}
                      viewBox="0 0 16 16"
                      className={`color bi ${currentSong === song.preview ? "bi-pause-fill" : "bi-play-fill"}`}
                      fill="currentColor"
                      height="25"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {currentSong === song.preview ? (
                        // Icône Pause
                        <path d="M5.5 3.5h2v9h-2zm3 0h2v9h-2z" />
                      ) : (
                        // Icône Play
                        <path d="M6 3.5v9l6-4.5z" />
                      )}
                    </svg>

                    {/* 🔗 Deezer Song Link */}
                  <a href={song.url} target="_blank" rel="noopener noreferrer">
                    <svg
                      viewBox="0 0 16 16"
                      className="color1 bi bi-arrow-right"
                      fill="currentColor"
                      height="18"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  </div>
                </div>

                {/* 🔥 Animated Light Effects */}
                <div className="two"></div>
                <div className="three"></div>
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
