import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Card extends Component {
  render(){
    const content = (
      <div className="card">
        <div className="card-content">
          <p className="title">
            { this.props.title }
          </p>
          { this.props.subtitle ?
            <p className="subtitle medium-gray-text">
              { this.props.subtitle}
            </p>
            :
            ''
          }
        </div>
      </div>
    );

    if (this.props.url) {
      return (
        <div className="column is-half-desktop">
          <Link to={this.props.url}>
            {content}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="column is-half-desktop">
          {content}
        </div>
      );
    }
  }
}

export default Card;