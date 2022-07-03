

let funky = module.exports

funky.randomCrashGif = () => {

    const gifs = require("./json/gifs.json")

    return gifs[Math.floor(Math.random() * (gifs.length - 0 + 1) + 0)]

}