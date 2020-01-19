import React from "react";

const LanguageBar = ({ languages, size }) => {
  return (
    <>
      <p>Languages</p>
      <div>
        {Object.keys(languages).map(lang => {
          return <p key={lang}>{lang}</p>;
        })}
      </div>
    </>
  );
};

export default LanguageBar;
