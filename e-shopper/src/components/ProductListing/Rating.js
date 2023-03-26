import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import { RatingBox } from "../../components/ProductListing/ProductStyle";

function Rating({ score }) {
  function renderStars() {
    const stars = [];
    let filled = score;

    for (let i = 0; i < 5; i += 1) {
      stars.push(
        <FontAwesomeIcon
          color="orange"
          icon={filled > 0 ? "star" : farStar}
          key={`rating-${i}`}
        />
      );
      filled -= 1;
    }

    return stars;
  }

  return <RatingBox>{renderStars()}</RatingBox>;
}

Rating.defaultProps = {
  score: 3,
};

Rating.propTypes = {
  score: PropTypes.number,
};

export default Rating;
