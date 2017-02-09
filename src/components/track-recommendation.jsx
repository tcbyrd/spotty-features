import React from 'react'

class TrackRecommendation extends React.Component {
  imageColumn() {
    const { image } = this.props
    if (!image || image.length < 1) {
      return
    }
    return (
      <div className="column track-image-column">
        <img src={image} className="track-image" />
      </div>
    )
  }

  render() {
    const { name, artists, album } = this.props
    return (
      <li>
        <div className="columns">
          {this.imageColumn()}
          <div className="column">
            <span className="track-name">{name}</span>
            <span> by </span>
            <span className="track-artists">{artists.join(', ')}</span>
            <span className="track-album">{album}</span>
          </div>
        </div>
      </li>
    )
  }
}

TrackRecommendation.propTypes = {
  artists: React.PropTypes.array.isRequired,
  album: React.PropTypes.string.isRequired,
  albumUrl: React.PropTypes.string.isRequired,
  image: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired
}

export default TrackRecommendation