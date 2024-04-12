import React from "react";
import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
  const tagStyle = {
    HTML: {
      backgroundColor: "#fda821",
    },
    CSS3: {
      backgroundColor: "#15d4c8",
    },
    Javascript: {
      backgroundColor: "#ffd12c",
    },
    React: {
      backgroundColor: "#4cdafc",
    },
    default: {
      backgroundColor: "#f9f9f9",
    },
  };
  return (
    <button
      style={selected ? tagStyle[tagName] : tagStyle.default}
      type="button"
      onClick={() => selectTag(tagName)}
      className="tag"
    >
      {tagName}
    </button>
  );
};

export default Tag;
