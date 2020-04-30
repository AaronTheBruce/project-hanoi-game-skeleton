class HanoiGame {
  constructor(towers) {
    if (towers) { this.towers = towers } else { this.towers = [[3, 2, 1], [], []] }
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    // Assign basic variables
    let currentTower;
    let targetTower;
    let currentDisk;
    let bottomTargetDisk;
    let topTargetDisk;
    // make sure arguements are in bounds and then assign
    if ((startTowerIdx < 3 && startTowerIdx > -1) && (endTowerIdx < 3 && endTowerIdx > -1)) {
      currentTower = this.towers[startTowerIdx];
      targetTower = this.towers[endTowerIdx];
      bottomTargetDisk = targetTower[0];
      topTargetDisk = targetTower[targetTower.length - 1];
      currentDisk = currentTower[currentTower.length - 1];
    } else { return false } // otherwise return false as arguements are out of bounds

    // Some extra conditional logic incase of sneaky edge cases we didn't account for
    if (currentDisk > topTargetDisk) { return false; }
    if (startTowerIdx === endTowerIdx || currentDisk === undefined) { return false; }
    if (startTowerIdx === undefined || endTowerIdx === undefined) { return false; }
    if (bottomTargetDisk === undefined || currentDisk < bottomTargetDisk) { return true; }
  }



  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      const startingTower = this.towers[startTowerIdx];
      const endTower = this.towers[endTowerIdx];
      const startingDisk = startingTower[startingTower.length - 1];
      endTower.push(startingDisk);
      startingTower.pop();
      return true;
    } else return false;
   }

  isWon() { return this.towers[2].length === 3 ||  this.towers[1].length === 3 }

  // the below methods are complete and do not need to be modified
  print() {
    // will print our board nicely to our user
    console.log(JSON.stringify(this.towers));
  }

  promptMove(reader, callback) {
    this.print();
    reader.question("Enter a starting tower: ", start => {
      const startTowerIdx = parseInt(start);
      reader.question("Enter an ending tower: ", end => {
        const endTowerIdx = parseInt(end);
        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  run(reader, callback) {
    // we will prompt our user to provide a start and stop index using
    // a readline interface
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      // if the move is invalid we tell the user
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // Continue to play!
        this.run(reader, callback);
      } else {
        this.print();
        console.log("You win!");
        callback();
      }
    });
  }
}

module.exports = HanoiGame;
