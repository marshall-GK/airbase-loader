import React from "react";
import Skeleton from "../Skeleton/Skeleton";
import { fetchBlogPostData } from "../API/BlogPost.api";
import useStyles from "./Blog.styles";

const Blog: React.FC<any> = (props) => {
  const [blogData, setBlogData] = React.useState(
    {} as { id: string; title: string; content: string; imageUrl: string }
  );

  const [reload, setReload] = React.useState(true);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    if (reload) {
      fetchBlogData();
    }
  }, [reload]);

  const fetchBlogData = async () => {
    setIsImageLoaded(false);
    const response = await fetchBlogPostData();
    if (response.isSuccess) {
      setBlogData(response.data);
    } else {
      console.log(response.errorMessage);
    }
    setReload(false);
  };

  const handleImageLoad = (e: any) => {
    setIsImageLoaded(true);
  };

  const renderBlogImage = () => {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {!isImageLoaded ? (
          <Skeleton config={{ count: 1, height: "400px", width: '400px' }} />
        ) : null}
        <img
          src={blogData.imageUrl}
          onLoad={handleImageLoad}
          alt="Dog"
          style={{ display: isImageLoaded ? "block" : "none", width: '400px', height: '400px', objectFit: 'cover' }}
        />
      </div>
    );
  };

  const renderBlogTitle = () => {
    if (!blogData.title) return <h1><Skeleton config={{ count: 1, height: 40 }} /></h1>
    return <h1>{blogData.title}</h1>;
  };

  const renderBlogContent = () => {
    if (!blogData.content) {
      return (
        <div>
          <Skeleton config={{ count: 3, height: 20 }} />
          <Skeleton config={{ count: 3, height: 20 }} />
        </div>
      )
    }
    return <div dangerouslySetInnerHTML={{__html: blogData.content}}></div>;
  };

  const handleReload = () => {
    setBlogData({
      id: "",
      title: "",
      content: "",
      imageUrl: "",
    });
    setIsImageLoaded(false);
    setReload(true);
  };

  return (
    <div>
      <button type="button" onClick={handleReload}>
        Reload
      </button>
      <div className={classes.blogPostContainer}>
        {renderBlogImage()}
        <div>
          {renderBlogTitle()}
          {renderBlogContent()}
        </div>
      </div>
    </div>
  );
};

export default Blog;
