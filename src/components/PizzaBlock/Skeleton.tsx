import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props: any) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={550}
    viewBox="0 0 280 550"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="146" r="125" />
    <rect x="0" y="288" rx="14" ry="14" width="280" height="22" />
    <rect x="-2" y="358" rx="11" ry="11" width="280" height="88" />
    <rect x="145" y="396" rx="0" ry="0" width="8" height="1" />
    <rect x="3" y="462" rx="10" ry="10" width="95" height="30" />
    <rect x="125" y="454" rx="25" ry="25" width="152" height="45" />
    <rect x="249" y="460" rx="0" ry="0" width="4" height="12" />
    <rect x="71" y="325" rx="10" ry="10" width="130" height="19" />
  </ContentLoader>
);

export default Skeleton;
