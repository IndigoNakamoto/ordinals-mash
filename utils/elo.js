export function calculateNewElo(winnerElo, loserElo, kFactor = 32) {
    const winnerTransformedRating = Math.pow(10, winnerElo / 400);
    const loserTransformedRating = Math.pow(10, loserElo / 400);

    const expectedWinnerScore = winnerTransformedRating / (winnerTransformedRating + loserTransformedRating);
    const expectedLoserScore = loserTransformedRating / (winnerTransformedRating + loserTransformedRating);

    const newWinnerElo = winnerElo + kFactor * (1 - expectedWinnerScore);
    const newLoserElo = loserElo + kFactor * (0 - expectedLoserScore);

    return [newWinnerElo, newLoserElo];
}
