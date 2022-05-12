/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 * @returns
 */
export function updateGroupXScale (scale, data, width) {
  // TODO : Set the domain and range of the groups' x scale
  return scale
    .domain([1, d3.max(data, function (d) { return d.Act })]) // en X on veut les actes
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
  // TODO : Set the domain and range of the graph's y scale
  return scale
    .domain([0, d3.max(data, function (d) { return d.Count })]) // en y on veut le count
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
  const myGraph = d3.select('#graph-g')
  for (const [act, val] of data.entries()) {
    myGraph.append('g')
      .data([data[act]])
      .attr('class', 'group')
  }
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
  // const myGraph = d3.select('#graph-g')
  // d3.selectAll('g.group')
  //   .each(function (d) {
  //     let width = xSubgroup
  //   })
  console.log(y, xSubgroup, players, height, color, tip)
}
