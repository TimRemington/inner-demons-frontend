// Generates a random number between 1 and the num value
function randomNum(num) {
  return Math.floor(Math.random() * num) + 1
}

// Gives the amount of damage the user deals
function userAttack(ally, weapon, user) {
  let attackValue = ally.attack + weapon.attack
  let damage = 0

  damage += calcDamage(attackValue)
  damage += criticalWeapon(damage, weapon)
  damage += criticalAlly(damage, ally.attack, user.level)

  console.log("You hit for: ", damage)
  return damage
}

// Gives the amount of damage the monster deals
function monsterAttack(monster) {
  let damage = 0

  damage += calcDamage(monster.attack)
  damage += criticalWeapon(damage, monster.attack)

  console.log("Monster hit for: ", damage)
  return damage
}

// Calculates the damage. Each level has a 50% of adding 1 damage
function calcDamage(attackValue) {
  let damage = 0
  for (let i = 0; i < attackValue; i++) {
    if (50 >= randomNum(100)) {
      damage++
    }
  }
  return damage
}

// When a weapon crit is scored, double the damage
function criticalWeapon(damage, weapon) {
  let critChance = weapon.chaos * .01
  let critSuccess = Math.random().toFixed(2)

  if (critSuccess <= critChance) {
    console.log('The Gods smile upon you, critical hit!')
    return damage
  } else {
    return 0
  }
}

// When an ally crit is scored, add level to damage
function criticalAlly(damage, ally, level) {
  let critChance = ally * .01
  let critSuccess = Math.random().toFixed(2)

  if (critSuccess <= critChance) {
    console.log(`Your ${ally.name} torn into your opponent, scoring a critical hit!`)
    return level
  } else {
    return 0
  }
}
