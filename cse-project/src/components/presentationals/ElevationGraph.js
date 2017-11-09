import React, { Component } from 'react'
import { extent as d3ArrayExtent } from 'd3-array'
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime
} from 'd3-scale'
import { line as d3Line } from 'd3-shape'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { select as d3Select } from 'd3-selection'
import { distanceHeversine } from '../../utils/closest'
import '../../App.css'

class ElevationGraph extends Component {
  render() {
    const { height, width, padding, track, currentIndex } = this.props
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
        .range([padding, width - padding])
      const yScale = d3ScaleLinear()
        .domain(d3ArrayExtent(data, selectY))
        .range([height - padding, padding])

      const selectScaledX = d => xScale(selectX(d))
      const selectScaledY = d => yScale(selectY(d))

      const node = this.node
      let valueline = d3Line()
        .x(selectScaledX)
        .y(selectScaledY)
      d3Select(node)
        .append('path')
        .attr('class', 'line')
        .attr('d', valueline(data))
      d3Select(node)
        .append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(d3AxisLeft().scale(yScale))
      d3Select(node)
        .append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(d3AxisBottom().scale(xScale))
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
