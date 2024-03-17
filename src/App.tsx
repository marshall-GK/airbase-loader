import React from "react";
import "./App.css";
import Blog from "./Blog/Blog";
import BlogWithHOC from "./BlogWithHOC/BlogWithHOC";

function App() {
  const [isHOCActive, setIsHOCActive] = React.useState(false);
  const [enableSkeletonTemplate, setEnableSkeletonTemplate] =
    React.useState(false);
  
    const handleSetHOCActive = (value: boolean) => {
    setIsHOCActive(value);
  };

  const handleActiveSkeletonTemplate = (value: boolean) => {
    setEnableSkeletonTemplate(value);
  };

  return (
    <div className="App">
      <div>
        <button type="button" onClick={() => handleSetHOCActive(true)} className={isHOCActive ? 'activeButton' : ''}>
          With HOC
        </button>
        <button type="button" onClick={() => handleSetHOCActive(false)} className={!isHOCActive ? 'activeButton' : ''}>
          Without HOC
        </button>
      </div>
      <div>
        <button
          disabled={!isHOCActive}
          type="button"
          onClick={() => handleActiveSkeletonTemplate(false)}
          className={(!enableSkeletonTemplate && isHOCActive) ? 'activeButton' : ''}
        >
          Default Skeleton Template
        </button>
        <button
          disabled={!isHOCActive}
          type="button"
          onClick={() => handleActiveSkeletonTemplate(true)}
          className={(enableSkeletonTemplate && isHOCActive) ? 'activeButton' : ''}
        >
          Custom Skeleton Template
        </button>
      </div>
      {isHOCActive ? <BlogWithHOC enableSkeletonTemplate={enableSkeletonTemplate} /> : <Blog />}
    </div>
  );
}

export default App;
