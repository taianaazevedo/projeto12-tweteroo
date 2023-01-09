import express from "express"
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})

let usuarioLogado = []
let tweets = []


app.post("/sign-up", (req, res) => {
    const { username, avatar} = req.body
    const usuario = {
        username: username,
        avatar: avatar
    }
    usuarioLogado.push(usuario)
	res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const avatarUsuario = usuarioLogado.map((item) => item.avatar)

    const tweetUsuario = {
        username: username,
        tweet: tweet,
        avatar: avatarUsuario
    }
    if(!usuarioLogado.find((u) => u.username === username)){
        return res.send("UNAUTHORIZED")
    } else {
        tweets.push(tweetUsuario)
        res.status(201).send("OK")
    }
})

app.get("/tweets", (req, res) => {
    const ultimosTweets = (tweets.length >= 10) ? tweets.slice(tweets.length - 10) : tweets;
    // console.log(ultimosTweets.reverse())
    res.send(ultimosTweets.reverse())
})

