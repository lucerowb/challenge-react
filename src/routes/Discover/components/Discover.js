import React, { useEffect } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import { useToken } from "../../../common/hooks";
import { fetchBlocks } from "../../../services/discover";

const Discover = (props) => {
  const { code } = props;

  const { accessToken, refreshToken, tokenExpiration } = useToken(code);

  const [newReleases, setNewReleases] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [playlists, setPlaylists] = React.useState([]);

  useEffect(() => {
    if (accessToken) {
      fetchBlocks(accessToken, "new-releases").then((response) => {
        if (response.status === 200) {
          setNewReleases(response.data.albums.items);
        }
      });
      fetchBlocks(accessToken, "featured-playlists").then((response) => {
        if (response.status === 200) {
          setPlaylists(response.data.playlists.items);
        }
      });
      fetchBlocks(accessToken, "categories").then((response) => {
        if (response.status === 200) {
          setCategories(response.data.categories.items);
        }
      });
    }
  }, [accessToken]);

  return (
    <div className="discover">
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
      />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  );
};

export default Discover;
