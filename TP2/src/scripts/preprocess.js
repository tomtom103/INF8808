/**
 * Sanitizes the names from the data in the "Player" column.
 *
 * Ensures each word in the name begins with an uppercase letter followed by lowercase letters.
 *
 * @param {object[]} data The dataset with unsanitized names
 * @returns {object[]} The dataset with properly capitalized names
 */
export function cleanNames (data) {
  return data.map((value) => {
    let playerName = value.Player.toLowerCase()
    playerName = playerName[0].toUpperCase() + playerName.slice(1)

    return {
      ...value,
      Player: playerName
    }
  })
}

/**
 * Finds the names of the 5 players with the most lines in the play.
 *
 * @param {object[]} data The dataset containing all the lines of the play
 * @returns {string[]} The names of the top 5 players with most lines
 */
export function getTopPlayers (data) {
  const playerNameMap = new Map()
  data.forEach((value) => {
    if (playerNameMap.has(value.Player)) {
      playerNameMap.set(value.Player, playerNameMap.get(value.Player) + 1)
    } else {
      playerNameMap.set(value.Player, 1)
    }
  })
  const sortedMap = [...playerNameMap].sort((a, b) => b[1] - a[1])
  return sortedMap.slice(0, 5).map((value) => value[0])
}

/**
 * Transforms the data by nesting it, grouping by act and then by player, indicating the line count
 * for each player in each act.
 *
 * The resulting data structure ressembles the following :
 *
 * [
 *  { Act : ___,
 *    Players : [
 *     {
 *       Player : ___,
 *       Count : ___
 *     }, ...
 *    ]
 *  }, ...
 * ]
 *
 * The number of the act (starting at 1) follows the 'Act' key. The name of the player follows the
 * 'Player' key. The number of lines that player has in that act follows the 'Count' key.
 *
 * @param {object[]} data The dataset
 * @returns {object[]} The nested data set grouping the line count by player and by act
 */
export function summarizeLines (data) {
  return d3.nest()
    .key((value) => value.Act)
    .key((value) => value.Player)
    .entries(data)
    .map((value) => {
      return {
        Act: value.key,
        Players: value.values.map((player) => {
          return {
            Player: player.key,
            Count: player.values.length
          }
        })
      }
    })
}

/**
 * For each act, replaces the players not in the top 5 with a player named 'Other',
 * whose line count corresponds to the sum of lines uttered in the act by players other
 * than the top 5 players.
 *
 * @param {object[]} data The dataset containing the count of lines of all players
 * @param {string[]} top The names of the top 5 players with the most lines in the play
 * @returns {object[]} The dataset with players not in the top 5 summarized as 'Other'
 */
export function replaceOthers (data, top) {
  return data.map((value) => {
    const otherPlayerLinesCount = value.Players.filter((player) => !top.includes(player.Player)).reduce((acc, curr) => acc + curr.Count, 0)
    return {
      ...value,
      Players: [
        ...value.Players.filter((player) => top.includes(player.Player)),
        {
          Player: 'Other',
          Count: otherPlayerLinesCount
        }
      ]
    }
  })
}
