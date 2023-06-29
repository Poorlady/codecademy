const prompt = require('prompt-sync')({ sigint: true })

const hat = '^'
const hole = 'O'
const fieldCharacter = '░'
const pathCharacter = '*'

class Field {
    constructor(field = []) {
        this.fieldToRender = field
        this.startPosition = ''
        this.hatPosition = ''
        this.gameEnd = false
        this.message = ''
        this.initGame()
    }

    static generateField(length = 0, width = 0, percentage) {
        let newField = [[]]

        // fill array
        for (let i = 0;i < length;i++) {
            newField[i] = new Array(width).fill(fieldCharacter)
        }

        // calculate how many holes
        let holes = Math.ceil((length * width) * percentage / 100)

        // random hole by percentage
        for (let i = 0;i < holes;) {
            const axisY = Math.floor(Math.random() * length)
            const axisX = Math.floor(Math.random() * width)
            if (holes === 1) {
                newField[axisY][axisX] = hole
                i++
            } else {
                if (newField[axisY][axisX] === fieldCharacter) {
                    newField[axisY][axisX] = hole
                    i++
                } else {
                    continue
                }
            }
        }

        // random hat position
        for (let i = 0;i < 1;) {
            const axisY = Math.floor(Math.random() * length)
            const axisX = Math.floor(Math.random() * width)
            if (newField[axisY][axisX] === fieldCharacter) {
                newField[axisY][axisX] = hat
                i++
            } continue
        }

        // random player position
        for (let i = 0;i < 1;) {
            const axisY = Math.floor(Math.random() * length)
            const axisX = Math.floor(Math.random() * width)
            if (newField[axisY][axisX] === fieldCharacter) {
                newField[axisY][axisX] = pathCharacter
                i++
            } continue
        }
        // this.fieldToRender(newField)
        return newField
    }

    initGame() {
        // get the player inital position
        // get the hat position
        this.fieldToRender.forEach((row, index) => {
            row.forEach((sign, indexSub) => {
                if (sign !== pathCharacter && sign !== hat) {
                    return
                }
                if (sign === pathCharacter) {
                    this.startPosition = [index, indexSub]
                }
                if (sign === hat) {
                    this.hatPosition = [index, indexSub]
                }
            })
        })
    }

    checkGame(yAxis, xAxis) {
        const copiedField = [...this.fieldToRender]

        // check if out of bound
        if (copiedField[yAxis][xAxis] === undefined) {
            this.message = 'Out of bound instruction'
            return false
        } else {
            // check if hole
            if (copiedField[yAxis][xAxis] === hole) {
                this.message = 'Sorry, you fell down a hole'
                return false
                // you got the hat
            } else if (copiedField[yAxis][xAxis] === hat) {
                this.message = 'Congrats, you found your hat'
                return false
            } else {
                copiedField[yAxis][xAxis] = pathCharacter
                this.fieldToRender = copiedField
                return true
            }
        }
    }

    // starting game with input
    playGame() {
        let yAxis = this.startPosition[0]
        let xAxis = this.startPosition[1]

        while (!this.gameEnd) {

            this.print()
            const value = prompt('Which way? ')

            switch (value) {
                case 'L':
                    xAxis = xAxis - 1
                    break
                case 'R':
                    xAxis = xAxis + 1
                    break
                case 'U':
                    yAxis = yAxis - 1
                    break
                case 'B':
                    yAxis = yAxis + 1
                    break
                default:
                    break
            }

            // check if the input is okay or note
            const checkResult = this.checkGame(yAxis, xAxis)

            // if it is not okay end
            if (!checkResult) {
                this.gameEnd = true
                console.log(this.message)
            }
        }
    }

    // print the field in string format
    print() {
        let stringedField = ''
        this.fieldToRender.forEach(row => {
            stringedField = stringedField + '\n' + row.join("")
        })
        console.log(stringedField)
    }
}

// const myField = new Field([
//     ["*", '░', 'O'],
//     ["░", 'O', '░'],
//     ["░", '^', '░']
// ])

// console.log('hello')
Field.generateField(4, 4, 20)
const myField = new Field(Field.generateField(4, 4, 20))

myField.playGame()
