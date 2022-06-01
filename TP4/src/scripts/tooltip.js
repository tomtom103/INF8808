/**
 * Defines the contents of the tooltip. See CSS for tooltip styling. The tooltip
 * features the country name, population, GDP, and CO2 emissions, preceded
 * by a label and followed by units where applicable.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  // TODO : Generate tooltip contents
  return `
    <span>Country : <span class="tooltip-value">${d['Country Name']}</span></span>
    <br>
    <span>Population : <span class="tooltip-value">${d.Population}</span></span>
    <br>
    <span>GDP :<span class="tooltip-value"> ${d.GDP}</span></span>
    <br>
    <span>CO2 Emissions : <span class="tooltip-value">${d.CO2}</span</span>
  `
}
