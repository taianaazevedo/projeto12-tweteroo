import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})

let usuariosLogados = [
    // {
    // username: "dwight schrute",
    // avatar: "https://www.looper.com/img/gallery/the-best-time-dwight-schrute-ever-broke-character-on-the-office/intro-1620063081.jpg"
    // }
]
let tweets = []


app.post("/sign-up", (req, res) => {
    const { username, avatar} = req.body
    const usuario = {
        username: username,
        avatar: avatar
    }
    usuariosLogados.push(usuario);
	res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const tweetUsuario = {
        username: username,
        tweet: tweet
    }
    if(!usuariosLogados.find((u) => u.username === username)){
        return res.send("UNAUTHORIZED")
    } else {
        tweets.push(tweetUsuario)
        res.send("OK")
    }


})



