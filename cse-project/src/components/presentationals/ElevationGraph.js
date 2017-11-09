import React, { Component } from 'react'
import { extent as d3ArrayExtent } from 'd3-array'
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime
} from 'd3-scale'
import { line as d3Line } from 'd3-shape'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { select as d3Select, mouse as d3Mouse } from 'd3-selection'
import { distanceHeversine } from '../../utils/closest'
import './Graph.css'

class ElevationGraph extends Component {
  componentDidMount() {
    this.createChart.bind(this)()
  }

  componentDidUpdate() {
    this.createChart.bind(this)()
  }

  createChart() {
    const { height, width, padding, track, currentIndex } = this.props
    // Clear previous graph
    d3Select(this.node)
      .selectAll('*')
      .remove()

    if (track) {
      let data = track.points
      const dataXtemp = track.points.map((d, i) => {
        if (i >= 1) {
          return distanceHeversine(d, track.points[i - 1])
        } else {
          return 0
        }
      })
      const dataX = dataXtemp.map((d, i) => {
        if (i >= 1) {
          return dataXtemp.slice(0, i + 1).reduce((a, b) => a + b)
        }
        return 0
      })
      data = data.map((d, i) => {
        return [dataX[i], d[2]]
      })

      const selectY = d => d[1]
      const selectX = d => d[0]

      const xScale = d3ScaleLinear()
        .domain(d3ArrayExtent(data, selectX))
        .range([padding, width - 5])
      const yScale = d3ScaleLinear()
        .domain(d3ArrayExtent(data, selectY))
        .range([height - padding, padding])

      const selectScaledX = d => xScale(selectX(d))
      const selectScaledY = d => yScale(selectY(d))

      const node = this.node

      let circles = d3Select(node)
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 2)
        .attr('cx', selectScaledX)
        .attr('cy', selectScaledY)
        .attr('fill', track.color)
        .on('mouseover', (d, i) => {
          this.props.setCurrentClosestPointIndexInCurrentTrack(i)
        })
        .on('mouseout', (d, i) => {
          this.props.setCurrentClosestPointIndexInCurrentTrack(undefined)
        })

      if (this.props.currentIndex) {
        circles.attr(
          'fill-opacity',
          (d, i) => (i <= this.props.currentIndex ? 1 : 0.2)
        )
        d3Select(node)
          .append('text')
          .text(
            Math.ceil(data[this.props.currentIndex][0]) +
              ', ' +
              Math.ceil(data[this.props.currentIndex][1])
          )
          .attr('class', 'graphLabel87')
          .attr('dx', selectScaledX(data[this.props.currentIndex]) + 10)
          .attr('dy', selectScaledY(data[this.props.currentIndex]) + 5)
      }

      d3Select(node)
        .append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(d3AxisLeft().scale(yScale))
      d3Select(node)
        .append('text')
        .text('Elevation (m)')
        .attr('dx', 0)
        .attr('dy', padding / 2)
        .attr('class', 'graphLabel54')
      d3Select(node)
        .append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3AxisBottom().scale(xScale))
      d3Select(node)
        .append('text')
        .text('Distance from origin (m)')
        .attr('dx', width)
        .attr('text-anchor', 'end')
        .attr('dy', height - 3)
        .attr('class', 'graphLabel54')
    }
  }

  render() {
    if (this.props.track) {
      const { height, width } = this.props
      return (
        <svg
          style={styles.container}
          height={height}
          width={width}
          ref={node => (this.node = node)}
        />
      )
    }
    return null
  }
}

const styles = {
  container: {}
}

export { ElevationGraph }
