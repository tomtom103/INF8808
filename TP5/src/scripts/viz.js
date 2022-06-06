/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain
  color.domain(Array.from(
    new Set(data.features.map(feature => feature.properties.TYPE_SITE_INTERVENTION))
  ).sort())
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover handlers
  d3.select('#map-g')
    .selectAll('path')
    .data(data.features)
    .join('path')
    .attr('d', d => path(d))
    .attr('fill', '#CDD1C4')
    .attr('stroke', '#FFFFFF')
    .on('mouseover', (d) => showMapLabel(d, path))
    .on('mouseout', function (d) {
      d3.select(`.${d.properties.NOM.replace(/(\s|')+/g, '-').toLowerCase()}`).remove()
    })
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  d3.select('.main-svg')
    .insert('text')
    .attr('class', d.properties.NOM.replace(/(\s|')/g, '-').toLowerCase())
    .attr('transform', `translate(${path.centroid(d).join(',')})`)
    .attr('text-anchor', 'middle')
    .style('font-size', '12px')
    .text(d.properties.NOM)
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
  d3.select('#marker-g')
    .selectAll('circle')
    .data(data.features)
    .join('circle')
    .attr('r', 5)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION))
    .attr('stroke', 'white')
    .on('mouseover', function () {
      d3.select(this).attr('r', 6)
    })
    .on('mouseout', function () {
      d3.select(this).attr('r', 5)
    })
    .on('click', function (d) {
      panel.display(d, color)
    })
}
