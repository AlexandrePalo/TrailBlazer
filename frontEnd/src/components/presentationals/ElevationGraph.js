import React, { Component } from 'react'
import roundTo from 'round-to'
import { extent as d3ArrayExtent } from 'd3-array'
import { scaleLinear as d3ScaleLinear } from 'd3-scale'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { select as d3Select, mouse as d3Mouse } from 'd3-selection'
import { distanceHeversine } from '../../utils/closest'
import './Graph.css'
import { PaperForm } from './'

class ElevationGraph extends Component {
  componentDidMount() {
    this.createChart.bind(this)()
  }

  componentDidUpdate() {
    this.createChart.bind(this)()
  }

  createChart() {
    const { height, width, padding, track } = this.props
    let that = this

    // Clear previous graph
    d3Select(this.node)
      .selectAll('*')
      .remove()

    if (track) {
      let data = track.pointsFull

      const yScale = d3ScaleLinear()
        .domain(d3ArrayExtent(data, d => d[3]))
        .range([height - padding, padding])

      const node = this.node

      d3Select(node)
        .append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + 50 + ', 0)')
        .call(d3AxisLeft().scale(yScale))

      d3Select(node)
        .append('text')
        .text('Distance (m)')
        .attr('x', 85)
        .attr('y', 12)

      if (this.props.currentIndex) {
        d3Select(node)
          .append('text')
          .text('POI weight: ' + roundTo(data[that.props.currentIndex][4], 2))
          .attr('x', 220)
          .attr('y', yScale(data[that.props.currentIndex][3]) - 10)
        d3Select(node)
          .append('text')
          .text('Track weight: ' + roundTo(data[that.props.currentIndex][5], 2))
          .attr('x', 220)
          .attr('y', yScale(data[that.props.currentIndex][3]) + 8)
        d3Select(node)
          .append('text')
          .text(
            'Distance: ' + Math.round(data[that.props.currentIndex][3]) + 'm'
          )
          .attr('x', 220)
          .attr('y', yScale(data[that.props.currentIndex][3]) + 26)

        let rectBefore = d3Select(node)
          .append('rect')
          .attr('width', 150)
          .attr(
            'height',
            height - padding - yScale(data[that.props.currentIndex][3])
          )
          .attr('x', 60)
          .attr('y', yScale(data[that.props.currentIndex][3]))
          .attr('fill', track.color)
        rectBefore.on('mousemove', function(d) {
          let coords = [
            d3Mouse(d3Select(this).node())[0] - 60,
            yScale.invert(d3Mouse(d3Select(this).node())[1])
          ]

          for (let i = 0; i < data.length; i++) {
            if (
              yScale.invert(d3Mouse(d3Select(this).node())[1]) <= data[i][3]
            ) {
              that.props.setCurrentClosestPointIndexInCurrentTrack(i)
              break
            }
          }
        })
        rectBefore.on('mouseout', function(d) {
          that.props.setCurrentClosestPointIndexInCurrentTrack(undefined)
        })
        let rectAfter = d3Select(node)
          .append('rect')
          .attr('width', 150)
          .attr('height', height - 2 * padding)
          .attr('x', 60)
          .attr('y', padding)
          .attr('fill', track.color)
          .attr('fill-opacity', 0.1)
        rectAfter.on('mousemove', function(d) {
          let coords = [
            d3Mouse(d3Select(this).node())[0] - 60,
            yScale.invert(d3Mouse(d3Select(this).node())[1])
          ]

          for (let i = 0; i < data.length; i++) {
            if (
              yScale.invert(d3Mouse(d3Select(this).node())[1]) <= data[i][3]
            ) {
              that.props.setCurrentClosestPointIndexInCurrentTrack(i)
              break
            }
          }
        })
        rectAfter.on('mouseout', function(d) {
          that.props.setCurrentClosestPointIndexInCurrentTrack(undefined)
        })
      } else {
        let rect = d3Select(node)
          .append('rect')
          .attr('width', 150)
          .attr('height', height - 2 * padding)
          .attr('x', 60)
          .attr('y', padding)
          .attr('fill', track.color)
        rect.on('mousemove', function(d) {
          let coords = [
            d3Mouse(d3Select(this).node())[0] - 60,
            yScale.invert(d3Mouse(d3Select(this).node())[1])
          ]

          for (let i = 0; i < data.length; i++) {
            if (
              yScale.invert(d3Mouse(d3Select(this).node())[1]) <= data[i][3]
            ) {
              that.props.setCurrentClosestPointIndexInCurrentTrack(i)
              break
            }
          }
        })

        rect.on('mouseout', function(d) {
          that.props.setCurrentClosestPointIndexInCurrentTrack(undefined)
        })
      }
    }
  }

  render() {
    if (this.props.track) {
      const { height, width, track } = this.props

      let data = track.pointsFull

      // Set min, max, ave
      let poiWeight = {
        min: Number.MAX_SAFE_INTEGER,
        max: Number.MIN_SAFE_INTEGER,
        ave: 0,
        sum: 0
      }
      let trackWeight = {
        min: Number.MAX_SAFE_INTEGER,
        max: Number.MIN_SAFE_INTEGER,
        ave: 0,
        sum: 0
      }
      const totalDistance = roundTo(data[data.length - 1][3], 2)

      data.forEach(d => {
        if (d[4] < poiWeight.min) {
          poiWeight.min = d[4]
        }
        if (d[4] > poiWeight.max) {
          poiWeight.max = d[4]
        }
        poiWeight.sum = poiWeight.sum + d[4]
        if (d[5] < trackWeight.min) {
          trackWeight.min = d[5]
        }
        if (d[5] > trackWeight.max) {
          trackWeight.max = d[5]
        }
        trackWeight.sum = trackWeight.sum + d[5]
      })
      // Round everything to 2 places
      poiWeight.ave = roundTo(poiWeight.sum / data.length, 2)
      trackWeight.ave = roundTo(trackWeight.sum / data.length, 2)
      poiWeight.min = roundTo(poiWeight.min, 2)
      trackWeight.min = roundTo(trackWeight.min, 2)
      poiWeight.max = roundTo(poiWeight.max, 2)
      trackWeight.max = roundTo(trackWeight.max, 2)

      return (
        <PaperForm title="Graphs">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <svg
              style={styles.container}
              height={height}
              width={width}
              ref={node => (this.node = node)}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100%',
                marginRight: '20px'
              }}
            >
              <span style={styles.titleRight}>Total distance</span>
              <span style={styles.resultRight}>{totalDistance} m</span>
              <span style={styles.titleRight}>POI weight</span>
              <span style={styles.resultRight}>
                Min: {poiWeight.min}, Max: {poiWeight.max}, Average:{' '}
                {poiWeight.ave}
              </span>
              <span style={styles.titleRight}>Track weight</span>
              <span style={styles.resultRight}>
                Min: {trackWeight.min}, Max: {trackWeight.max}, Average:{' '}
                {trackWeight.ave}
              </span>
            </div>
          </div>
        </PaperForm>
      )
    }
    return null
  }
}

const styles = {
  container: {},
  titleRight: {
    fontSize: '14pt',
    color: 'black',
    opacity: 0.87,
    marginTop: '10px'
  },
  resultRight: {
    fontSize: '12pt',
    color: 'black',
    opacity: 0.54
  }
}

export { ElevationGraph }
