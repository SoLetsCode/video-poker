import React from "react";

export default function Music() {
  return (
    <div className="music">
      <div className="music__title">
        In dedication to my wonderful educators Noor and Jim at Brainstation
        please enjoy their favorite songs.
      </div>
      <div className="music__container">
        <iframe
          title="Shape of My Heart"
          width="50%"
          height="100"
          scrolling="yes"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/230333838&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        ></iframe>
        <iframe
          title="Lean on Me"
          width="50%"
          height="100"
          scrolling="yes"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/49660514&color=%23000000&auto_play=false&hide_related=false&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        ></iframe>
      </div>
    </div>
  );
}
