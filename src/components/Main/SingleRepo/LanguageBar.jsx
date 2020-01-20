import React from "react";
import styled from "styled-components";

import { colors } from "../../../utils";

const LanguageBar = ({ languages, size }) => {
  return (
    <>
      <h3>Languages</h3>
      <section className="languages">
        {Object.keys(languages).map(lang => {
          return (
            <Language key={lang} color={colors[lang]}>
              <div role="presentation">&nbsp;</div>
              <p>
                {lang} - {Math.round((languages[lang] / size) * 100)}%
              </p>
            </Language>
          );
        })}
      </section>
    </>
  );
};

export default LanguageBar;

const Language = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5px;

  & > div {
    width: 10px;
    height: 10px;
    background: ${({ color }) => color};
    border-radius: 50%;
    margin-right: 5px;
  }
`;
