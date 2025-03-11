import React, { useState, useEffect, FormEvent } from "react";
import PlaylistCompo from "./PlaylistCompo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";
import { getPlaylistFromDjClaude } from "../api-handlers/ai";
import ClipLoader from "react-spinners/ClipLoader";
import { getCoverFromDeezerApi } from "../api-handlers/deezer";

// DEF TYPE FINAL OBJ I RETRIEVE
interface Song {
  title: string;
  artist: string;
  cover: string;
  url: string;
  preview: string;
}

export default function Main() {
  const [list, setList] = React.useState<string[]>(["Rock", "Build app", "Motivated"]);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [hover, setHover] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const focusPlaylistRef = React.useRef<HTMLDivElement>(null);

  // handle the form submission and add a keyword to the list
  function addKeyword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = formData.get("keyword") as string;
    if (keyword) {
      setList((prevList) => [...prevList, keyword]);
    }
    event.currentTarget.reset();
  }

  // handle the removal of a keyword from the list
  function handleCancelItem(index: number) {
    setList((prevList) => prevList.filter((_, i) => i !== index));
  }

  // functions to handle the bounce effect when hovering over the trash icon
  function toggleBounce(index: number) {
    setHover(index);
  }

  function removeBounce() {
    setHover(null);
  }

  // async function to call the AI function to get a palyslist from the list of keywords
  // handle the state for the loader
  async function togglePlaylist() {
    setIsLoading(true);
    try {
      const playlist = await getPlaylistFromDjClaude(list);
      const songsWithCovers = await getCoverFromDeezerApi(playlist);
      console.log("Final Playlist with Covers:", songsWithCovers);
      setPlaylist(songsWithCovers); // ✅ Update state correctly
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Dynamic anchor on the playlist
  useEffect(() => {
    if (!isLoading && playlist.length > 0) {
      focusPlaylistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isLoading, playlist]);

  // map the list of keywords to a list of JSX elements
  const keywordsList = list.map((item, index) => (
    <div className="keywords-added" key={index}>
      <div >
        <li>
          <FontAwesomeIcon
          onClick={() => handleCancelItem(index)}
          onMouseEnter={() => toggleBounce(index)}
          onMouseLeave={removeBounce}
          icon={faCircleMinus}
          bounce={hover === index}
         />
        </li>
      </div>
      <li className="li-keyword">{item}</li>
      </div>
  ));

  return (
    <main className="main-content">
      <div className="main-container">
      <h2 className="listPartText">What’s your
       <span className="colored-spaned-words"> sound</span> today?</h2>
      <h3 className="simple-text">Enter
        <span className="colored-spaned-words"> mood</span>,
        <span className="colored-spaned-words"> activity</span>, <span className="listPartTextOr">or</span>
        <span className="colored-spaned-words"> genre</span>!
      </h3>

      <form onSubmit={addKeyword}>
        <input className="keywords-input" type="text" placeholder="e.g. ROCK" name="keyword" />
        <input className="button-submit" type="submit" value="+ KEYWORD" />
      </form>

        {keywordsList.length !== 0 && (
          <section className="listPart">
            {keywordsList.length < 3 &&
              <p >✨Please enter at least 3 keywords </p>}
            <ul className="listPartList">{keywordsList}</ul>
              {list.length > 2 && (
                <>
                  <button onClick={togglePlaylist} className="button-submit">
                    Generate Playlist
                  </button>
                    {isLoading &&
                      <div className="loader-container">
                        <ClipLoader color="#ff5722" loading={isLoading} size={50} />
                        <p className="loading-text">🎺Crafting your sound...</p>
                      </div>
                    }
                </>
              )}
          </section>
        )}

        </div>

      {playlist.length > 0 &&
      ( <div ref={focusPlaylistRef}>
          <PlaylistCompo playlist={playlist} />
        </div>
    )}
    </main>
  );
}
