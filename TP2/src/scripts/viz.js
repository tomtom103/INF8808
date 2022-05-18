/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 * @returns
 */
export function updateGroupXScale (scale, data, width) {
  return scale
    .domain(data.map((value) => value.Act)) // en X on veut les actes
    .range([0, width])
}
/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 * @returns
 */
export function updateYScale (scale, data, height) {
  const maxCount = Math.max(...data.map((value) => Math.max(...value.Players.map((v) => v.Count))))
  return scale
    .domain([0, maxCount])
    .range([height, 0])
}
/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
export function createGroups (data, x) {
  // TODO : Create the groups
  d3.select('#graph-g')
    .selectAll('.group')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'group')
    .attr('tranform', (group) => `translate(${x(group.Act)})`)
}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
export function drawBars (y, xSubgroup, players, height, color, tip) {
  // TODO : Draw the bars
  d3.select('#graph-g')
    .selectAll('.group')
    .selectAll('rect')
    .data((d) => {
      const modifiedData = d.Players.map((player) => {
        return {
          ...player,
          Act: d.Act
        }
      })
      // { Player: 'Juliet', Count: 25, Act: 'Act 1' }
      // { Player: 'Romeo', Count: 50, Act: 'Act 2' }
      console.log(modifiedData)
      return modifiedData
    })
    .join('rect')
    .attr('x', (data, i) => (data[i].Act) * xSubgroup.range()[1] / data.length)
    .attr('y', (data, i) => y(data[i].Count))
    .attr('width', (data) => xSubgroup.range()[1] / data.length)
    .attr('height', (data, i) => data[i].Count / y.domain()[1] * height)
    .attr('fill', (_player, i) => color(i))
    // .each((group, idx, nodes) => {
    //   const barWidth = xSubgroup.range()[1] / players.length
    //   d3.select(nodes[idx])
    //     .selectAll('rect')
    //     .data(group.Players)
    //     .enter()
    //     .append('rect')
    //     .attr('x', (_player, i) => (i + 1) * barWidth)
    //     .attr('y', data => y(data.Count))
    //     .attr('width', barWidth)
    //     .attr('height', data => data.Count / y.domain()[1] * height)
    //     .attr('fill', (_player, i) => color(i))
    // })
}
