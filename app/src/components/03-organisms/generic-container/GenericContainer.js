import React from 'react';

// Styles
import './GenericContainer.scss';

function GenericContainer(props) {
  let containerTitle;
  if (props.title) {
    containerTitle = <div className="container-title">{props.title}</div>;
  }
  const containerContent = <div className="container-content">{props.content}</div>;
  return (
    <div className="container">
      {containerTitle}
      {containerContent}
    </div>
  );
}

export default GenericContainer;
