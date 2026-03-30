import React from "react";
import "./Skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text small"></div>
    </div>
  );
};

export default SkeletonCard;