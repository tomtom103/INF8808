/**
 * Defines the scale to use for the circle markers' radius.
 *
 * The radius of the circle is linearly proportinal to the population of the given country.
 *
 * The radius is a value defined in the interval [5, 20].
 *
 * @param {object} data The data to be displayed
 * @returns {*} The linear scale used to determine the radius
 */
export function setRadiusScale (data) {
  // TODO : Set scale
  const maxValues = []
  for (const year in data) {
    maxValues.push(d3.max(data[year], d => d.Population))
  }
  console.log(maxValues)
  return d3.scaleLinear()
    .domain([0, d3.max(maxValues)])
    .range([5, 20])
}

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale (data) {
  // TODO : Set scale
  const allContinents = new Set()
  Object.keys(data).forEach((year) => data[year].map(country => country.Continent).forEach(continent => allContinents.add(continent)))
  return d3.scaleOrdinal()
    .domain([...allContinents])
    .range(d3.schemeCategory10)
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  // TODO : Set scale
  const maxValues = []
  for (const year in data) {
    maxValues.push(Math.max(...data[year].map((val) => val.GDP)))
  }
  return d3.scaleLinear()
    .domain([0, Math.max(...maxValues)])
    .range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  // TODO : Set scale
  const maxValues = []
  for (const year in data) {
    maxValues.push(Math.max(...data[year].map((val) => val.CO2)))
  }
  return d3.scaleLinear()
    .domain([Math.max(...maxValues), 0])
    .range([0, height])
}
