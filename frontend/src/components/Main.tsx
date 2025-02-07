import React, { useState, FormEvent } from "react";
import PlaylistCompo from "./PlaylistCompo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { getPlaylistFromDjClaude } from "./ai";

export default function Main() {
  const [list, setList] = React.useState<string[]>(["Techno", "Coding", "powerfull"]);
  const [playlist, setPlaylist] = React.useState<[string, string][]>([]);
  const [hover, setHover] = React.useState<string | null>(null);

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

  // function to handle the bounce effect when hovering over the trash icon
  function toggleBounce(item: string) {
    setHover(item);
  }

  function removeBounce() {
    setHover(null);
  }

  // async function to call the AI function to get a palyslist from the list of keywords
  async function togglePlaylist() {
    try {
      const playlist = await getPlaylistFromDjClaude(list);
      console.log("Playlist fetched:", playlist);
      setPlaylist(playlist); // Update playlistGenerated state
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
  }

  // map the list of keywords to a list of JSX elements
  const keywordsList = list.map((item, index) => (
    <div className="div-list-cancel" key={index}>
      <li className="listPartItem">{item}</li>
      <FontAwesomeIcon
        onClick={() => handleCancelItem(item)}
        onMouseEnter={() => toggleBounce(item)}
        onMouseLeave={removeBounce}
        icon={faTrashCan}
        bounce={hover === item}
      />
    </div>
  ));

  return (
    <main className="main-content">
      <form onSubmit={addKeyword}>
        <input className="keywords-input" type="text" placeholder="e.g. Musical" name="keyword" />
        <input className="button-submit" type="submit" value="+ Add keyword" />
      </form>

      {keywordsList.length !== 0 && (
        <section className="keywords-section">
          <section className="listPart">
            <h2 className="listPartText">Mood of the moment:</h2>
            <div style={{ margin: "0.3rem 0" }}>
              {keywordsList.length < 3 && <p>* Please add at least 3 keywords 🍎</p>}
            </div>
            <ul className="listPartList">{keywordsList}</ul>
            {list.length > 2 && (
              <button onClick={togglePlaylist} className="button-submit">
                Generate Playlist
              </button>
            )}
          </section>
        </section>
      )}

      {playlist && <PlaylistCompo playlist={playlist} />}
    </main>
  );
}
