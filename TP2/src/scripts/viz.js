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
    .join('g')
    .attr('class', 'group')
    .attr('transform', (group) => 'translate(' + Math.round(x(group.Act)) + ')')
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
      return d.Players.map((player) => {
        return {
          ...player,
          Act: d.Act
        }
      })
    })
    .join('rect')
    .attr('x', (d) => xSubgroup(d.Player))
    .attr('y', (d) => y(d.Count))
    .attr('width', xSubgroup.range()[1] / players.length)
    .attr('height', (d) => height - y(d.Count))
    .attr('fill', (d) => color(d.Player))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
}
