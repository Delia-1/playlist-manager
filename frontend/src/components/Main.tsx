import React, { useEffect, useRef, useState, FormEvent } from "react";
import PlaylistCompo from "./PlaylistCompo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";
import { getPlaylistFromDjClaude } from "./ai";
import ClipLoader from "react-spinners/ClipLoader";

export default function Main() {
  const [list, setList] = React.useState<string[]>(["Techno", "Coding", "powerfull"]);
  const [playlist, setPlaylist] = React.useState<[string, string][]>([]);
  const [hover, setHover] = React.useState<string | null>(null);
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
  function handleCancelItem(item: string) {
    setList((prevList) => prevList.filter((element) => element !== item));
  }

  // functions to handle the bounce effect when hovering over the trash icon
  function toggleBounce(item: string) {
    setHover(item);
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
      console.log("Playlist fetched:", playlist);
      setPlaylist(playlist); // Update playlistGenerated state
    } catch (error) {
      console.error("Error fetching playlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Dynamic anchor on the playlist
  useEffect(() => {
    if (playlist.length > 0) {
      focusPlaylistRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [playlist]);

  // map the list of keywords to a list of JSX elements
  const keywordsList = list.map((item, index) => (
    <div className="div-list-cancel" key={index}>
              <div className="icon">
          <FontAwesomeIcon
        onClick={() => handleCancelItem(item)}
        onMouseEnter={() => toggleBounce(item)}
        onMouseLeave={removeBounce}
        icon={faCircleMinus}
        bounce={hover === item}
      />
          </div>
      <li className="listPartItem">{item}
      </li>

    </div>
  ));

  return (
    <main className="main-content">
      <h2 className="listPartText">What’s your <span className="spaned-words">sound</span> today?</h2>
      <h3 className="simple-text">Enter <span className="spaned-words">mood</span>, <span className="spaned-words">activity</span>, or <span className="spaned-words">genre</span>!</h3>
      <div className="form-selec-container">
        <form onSubmit={addKeyword}>
          <input className="keywords-input" type="text" placeholder="e.g. Musical" name="keyword" />
          <input className="button-submit" type="submit" value="+ KEYWORD" />
        </form>

        {keywordsList.length !== 0 && (
          <section className="">
            <section className="listPart">
                {keywordsList.length < 3 && <p >✨Please add at least 3 keywords </p>}
              <ul className="listPartList">{keywordsList}</ul>
              {list.length > 2 && (
                <>
                <button onClick={togglePlaylist} className="button-submit">
                  Generate Playlist
                </button>
                {isLoading &&
                  <div className="loader-container">
                  <ClipLoader color="#ff5722" loading={isLoading} size={50} />
                  <p className="loading-text">🎵 Crafting your sound...</p>
                </div>}
              </>
            )}
            </section>
          </section>
        )}
      </div>

      {playlist.length > 0 &&
      (<div ref={focusPlaylistRef}>
        <PlaylistCompo playlist={playlist} />
      </div>
    )}
    </main>
  );
}
