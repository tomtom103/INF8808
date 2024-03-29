/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
export function setRectHandler (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
  // TODO : Select the squares and set their event handlers
  d3.selectAll('.data-rect')
    .on('mouseover', function () {
      rectSelected(this, xScale, yScale)
      const data = d3.select(this).datum()
      selectTicks(data.Arrond_Nom, data.Plantation_Year)
    })
    .on('mouseout', function () {
      rectUnselected(this)
      unselectTicks()
    })
}

/**
 * The function to be called when one or many rectangles are in "selected" state,
 * meaning they are being hovered
 *
 * The text representing the number of trees associated to the rectangle
 * is displayed in the center of the rectangle and their opacity is lowered to 75%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 */
export function rectSelected (element, xScale, yScale) {
  // TODO : Display the number of trees on the selected element
  // Make sure the nimber is centered. If there are 1000 or more
  // trees, display the text in white so it contrasts with the background.
  element.style.opacity = 0.75
  const data = d3.select(element).datum()

  const boundingBox = d3.select(element).node().getBBox()

  d3.select(element).append('text')
    .attr('x', xScale(data.Plantation_Year) + boundingBox.width / 3)
    .attr('y', yScale(data.Arrond_Nom) + boundingBox.height * 0.75)
    .attr('pointer-events', 'none')
    .attr('fill', data.Counts < 1000 ? 'black' : 'white')
    .text(data.Counts)
}

/**
 * The function to be called when the rectangle or group
 * of rectangles is no longer in "selected state".
 *
 * The text indicating the number of trees is removed and
 * the opacity returns to 100%.
 *
 * @param {*} element The selection of rectangles in "selected" state
 */
export function rectUnselected (element) {
  // TODO : Unselect the element
  element.style.opacity = 1
  d3.select(element).selectAll('text').remove()
}

/**
 * Makes the font weight of the ticks texts with the given name and year bold.
 *
 * @param {string} name The name of the neighborhood associated with the tick text to make bold
 * @param {number} year The year associated with the tick text to make bold
 */
export function selectTicks (name, year) {
  // TODO : Make the ticks bold
  d3.selectAll('g.tick')
    .filter((d) => d === name || d === year)
    .select('text')
    .style('font-weight', 'bold')
}

/**
 * Returns the font weight of all ticks to normal.
 */
export function unselectTicks () {
  // TODO : Unselect the ticks
  d3.selectAll('g.tick')
    .select('text')
    .style('font-weight', 'normal')
}
