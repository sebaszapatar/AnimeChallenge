import React from "react";

const AnimeScore = ({ averageScore}) => {
    let message;
    if(averageScore > 7){
        message = "Great, this is one of the best anime.";
    } else if(averageScore >= 5){
        message = "You may have fun.";
    } else {
        message = "I do not recommend it.";
    }

    return(
        <div>
            <h2>Average Score: {averageScore}</h2>
            <p>{message}</p>
        </div>
    );
};

export default AnimeScore;