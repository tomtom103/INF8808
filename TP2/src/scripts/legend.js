/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".

  data.forEach((d) => {
    const myElement = d3.select('.legend')
    myElement
      .append('div')
      .attr('class', 'legend-element')
    myElement
      .append('svg')
      .attr('width', 15)
      .attr('height', 15)
      .append('rect')
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', color(d))
    myElement
      .append('text')
      .text(d)
      .style('padding-left', '5px')
  })
}
