import React from "react";
import Skeleton from "../Skeleton/Skeleton";

const SkeletonHOC = (WrappedComponent: any) => {
  const HOC = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [skeletonTemplate, setSkeletonTemplate] = React.useState();

    const handlePageLoading = (value: boolean) => {
      setIsLoading(value);
    };

    const renderSkeletonTemplate = () => {
      return skeletonTemplate || <Skeleton config={{ count: 5 }} />;
    };

    return (
      <div>
        <WrappedComponent
          {...props}
          setLoading={handlePageLoading}
          triggerReload={() => handlePageLoading(true)}
          setSkeletonTemplate={setSkeletonTemplate}
        />
        {isLoading ? renderSkeletonTemplate() : null}
      </div>
    );
  };
  return HOC;
};

export default SkeletonHOC;
