import React from "react";
import bannerImage from "./pictures/netflix3.png";

const Netflix = () => {
    return (
        <div>
            <img src={bannerImage} alt="Netflix banner" />
            <h1>Welcome to Netflix</h1>
            <p>
                This is the Netflix page. Here you can watch all of your
                favorite TV shows and movies.
            </p>
        </div>
    );
};

export default Netflix;
