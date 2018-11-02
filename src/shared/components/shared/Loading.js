import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({
  title = 'Loading, please wait',
}) => (
  <div className="center-div">
    {
      title ? (
        <h1 className="is-size-3 medium-gray-text marg-bot-2">
          {title}
        </h1>
      ) : null
    }
    <img
      className="marg-top-2"
      alt="loading"
      id="loading"
      src="https://i.imgur.com/Iq7qUnH.png"
      width="300px"
    />
  </div>
);

Loading.defaultProps = {
  title: 'Loading, please wait',
};

Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;