import React from "react";
import { fetchBlogPostData } from "../API/BlogPost.api";
import useStyles from "./BlogWithHOC.styles";
import SkeletonHOC from "../SkeletonHOC/SkeletonHOC";
import Skeleton from "../Skeleton/Skeleton";

const BlogWithHOC: React.FC<any> = (props) => {
  const {
    setLoading,
    triggerReload,
    setSkeletonTemplate,
    enableSkeletonTemplate,
  } = props;

  const [blogData, setBlogData] = React.useState(
    {} as { id: string; title: string; content: string; imageUrl: string }
  );

  const [reload, setReload] = React.useState(true);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    skeletonLoadingTemplate();
    handleReload();
    console.log({ enableSkeletonTemplate });
  }, [enableSkeletonTemplate]);

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
      setLoading(false);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={blogData.imageUrl}
          onLoad={handleImageLoad}
          alt="Dog"
          style={{
            display: isImageLoaded ? "block" : "none",
            width: "400px",
            height: "400px",
            objectFit: "cover",
          }}
        />
      </div>
    );
  };

  const renderBlogTitle = () => {
    return <h1>{blogData.title}</h1>;
  };

  const renderBlogContent = () => {
    return <div>{blogData.content}</div>;
  };

  const handleReload = () => {
    triggerReload();
    setBlogData({
      id: "",
      title: "",
      content: "",
      imageUrl: "",
    });
    setIsImageLoaded(false);
    setReload(true);
  };

  const skeletonLoadingTemplate = () => {
    const template = (
      <div>
        <div className={classes.blogPostContainer}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Skeleton config={{ count: 1, height: "400px", width: "400px" }} />
          </div>
          <div>
            <h1>
              <Skeleton config={{ count: 1, height: 40 }} />
            </h1>
            <Skeleton config={{ count: 3, height: 20 }} />
            <Skeleton config={{ count: 3, height: 20 }} />
          </div>
        </div>
      </div>
    );
    setSkeletonTemplate(enableSkeletonTemplate ? template : null);
  };

  return (
    <div key={`${enableSkeletonTemplate}`}>
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

export default SkeletonHOC(BlogWithHOC);
