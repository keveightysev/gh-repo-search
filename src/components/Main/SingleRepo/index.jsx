import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import { Link } from "@reach/router";

import "../../../styles/SingleRepo.scss";

import Owner from "./Owner";
import LanguageBar from "./LanguageBar";
import Loading from "../Loading";

import { useRepoSearchState } from "../../../contexts";

const SingleRepo = ({ id, navigate }) => {
  const [repo, setRepo] = useState({ loaded: false, error: false });
  const { searchTerm, currentPage } = useRepoSearchState();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(
            `https://api.github.com/repositories/${id}`
          );
          const { data: languages } = await axios.get(data.languages_url);
          const { data: owner } = await axios.get(data.owner?.url);
          setRepo({
            ...data,
            languages,
            owner,
            loaded: true
          });
        } catch (error) {
          setRepo({
            loaded: true,
            error: true
          });
          navigate(`/error/${error.response.status}`);
        }
      };
      fetchData();
    }
  }, [id, navigate]);

  return !repo.loaded ? (
    <Loading />
  ) : (
    <main className="single-repo">
      {searchTerm && (
        <Link to={`/results/${currentPage}`} className="return">
          <FaArrowLeft />
          &nbsp;Return to search results
        </Link>
      )}
      <h2>{repo.name}</h2>
      <a href={repo.html_url} target="_blank" rel="noreferrer noopener">
        View Repository on GitHub <FaExternalLinkAlt />
      </a>
      <p>
        Created: {moment(repo.created_at).format("MMMM D, YYYY")}
        <br />
        Updated: {moment(repo.updated_at).format("MMMM D, YYYY")}
      </p>
      <h3>Description</h3>
      <p>{repo.description}</p>
      <LanguageBar languages={repo.languages} size={repo.size} />
      <h3>Owner</h3>
      <Owner owner={repo.owner} />
    </main>
  );
};

export default SingleRepo;
