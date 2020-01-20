import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";

import Owner from "./Owner";
import LanguageBar from "./LanguageBar";
import Loading from "../Loading";

const SingleRepo = ({ id }) => {
  const [repo, setRepo] = useState({ loaded: false, error: false });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.github.com/repositories/${id}`
          );
          const { data: languages } = await axios.get(data.languages_url);
          const { data: followers } = await axios.get(data.owner.followers_url);
          setRepo({
            ...data,
            languages,
            owner: { ...data.owner, followers: followers.length },
            loaded: true
          });
        } catch (error) {
          setRepo({
            loaded: true,
            error: true
          });
        }
      };
      fetchData();
    }
  }, [id]);

  return !repo.loaded ? (
    <Loading />
  ) : (
    <main>
      <h2>{repo.name}</h2>
      <a href={repo.html_url} target="_blank" rel="noreferrer noopener">
        View Repository on GitHub <FaExternalLinkAlt />
      </a>
      <p>Created: {moment(repo.created_at).format("MMMM D, YYYY")}</p>
      <p>Updated: {moment(repo.updated_at).format("MMMM D, YYYY")}</p>
      <p>{repo.description}</p>
      <LanguageBar languages={repo.languages} size={repo.size} />
      <Owner owner={repo.owner} />
    </main>
  );
};

export default SingleRepo;
