import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const featureColors = {
  acousticness: '#FF7EAB',
  danceability: '#0ABD9C',
  energy: '#e3b951',
  valence: '#90B207',
  negativity: '#004DD0',
  instrumentalness: '#494949',
  liveness: '#AF33C8',
  speechiness: '#f09945'
}
const featureLabels = {
  acousticness: 'Acoustic',
  danceability: 'Danceable',
  energy: 'Energetic',
  valence: 'Positive',
  negativity: 'Negative',
  instrumentalness: 'Instrumental',
  liveness: 'Live',
  speechiness: 'Speechy'
}
const allFeatures = Object.keys(featureColors)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec']

class AudioFeaturesChart extends React.Component {
  dateLabel(date, includeYear) {
    const month = months[date.getMonth()]
    const day = date.getDate()
    if (!includeYear) {
      return `${month} ${day}`
    }
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  getChartData(features) {
    const { weeklyAverages } = this.props

    const dates = Object.keys(weeklyAverages.acousticness)
    dates.sort()

    const data = []
    let prevYear = null
    for (const dateStr of dates) {
      const date = new Date(dateStr)
      const year = date.getFullYear()
      const includeYear = prevYear !== year
      prevYear = year
      const datum = { dateLabel: this.dateLabel(date, includeYear) }
      for (const feature of features) {
        const value = weeklyAverages[feature][dateStr]
        datum[featureLabels[feature]] = Math.round(value * 100)
      }
      data.push(datum)
    }
    return data
  }

  featuresForType() {
    switch (this.props.type) {
      case 'mood': return ['valence', 'negativity']
      case 'party': return ['danceability', 'energy']
      case 'focus':
        return ['acousticness', 'instrumentalness', 'speechiness']
      default: return allFeatures
    }
  }

  render() {
    const features = this.featuresForType()
    const data = this.getChartData(features)
    const width = document.getElementById('spotify-container').clientWidth

    return (
      <LineChart width={width} height={300} data={data}>
        <XAxis dataKey="dateLabel" />
        <YAxis type="number" domain={[0, 100]} />
        <Tooltip />
        <Legend />
        {features.map(feature => {
          return (
            <Line
              key={feature}
              type="monotone"
              dataKey={featureLabels[feature]}
              stroke={featureColors[feature]}
            />
          )
        })}
      </LineChart>
    )
  }
}

AudioFeaturesChart.propTypes = {
  weeklyAverages: React.PropTypes.object.isRequired,
  type: React.PropTypes.string
}

export default AudioFeaturesChart
