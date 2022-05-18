/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
export function getContents (d) {
  /* TODO : Define and return the tooltip contents including :
      + A title stating the hovered element's group, with:
        - Font family: Grenze Gotish
        - Font size: 24px
        - Font weigth: normal
      + A bold label for the player name followed
        by the hovered elements's player's name
      + A bold label for the player's line count
        followed by the number of lines
  */
  const toolTip = d3.create()

  toolTip.append('div')
    .append('p')
    .attr('id', 'tooltip-title')
    .text('Act ' + d.Act)

  const toolTipData = d3.create().append('div')

  toolTipData.append('div')
    .style('margin-top', '-20px')
    .style('display', 'flex')
    .append('p')
    .style('font-weight', 'bold')
    .text('Player :')
    .append('p')
    .text(' ' + d.Player)
    .attr('class', 'tooltip-value')
    .style('padding-left', '5px')

  toolTipData.append('div')
    .style('margin-top', '-25px')
    .style('display', 'flex')
    .append('p')
    .style('font-weight', 'bold')
    .text('Count :')
    .append('p')
    .text(' ' + d.Count)
    .attr('class', 'tooltip-value')
    .style('padding-left', '5px')

  toolTip.append(() => toolTipData.node())

  return toolTip.html()
}
