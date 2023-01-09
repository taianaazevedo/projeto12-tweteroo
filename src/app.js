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
    const { username, avatar } = req.body
    const usuario = {
        username: username,
        avatar: avatar
    }

    if(!usuario.username || usuario.username === "" || typeof usuario.username !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
    if(!usuario.avatar || usuario.avatar === "" || typeof usuario.avatar !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    usuarioLogado.push(usuario)
	res.status(201).send("OK")
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body
    const avatarUsuario = usuarioLogado.map((item) => item.avatar)

    const tweetUsuario = {
        username: username,
        avatar: avatarUsuario.toString(),
        tweet: tweet        
    }
    if(!usuarioLogado.find((u) => u.username === username)){
        return res.send("UNAUTHORIZED")
    } 
    if(!tweetUsuario || tweetUsuario.tweet === "" || typeof tweetUsuario.tweet !== "string"){
        return res.status(400).send("Todos os campos são obrigatórios!")
    }
        tweets.push(tweetUsuario)
        res.status(201).send("OK")
    
})

app.get("/tweets", (req, res) => {
    const ultimosTweets = (tweets.length >= 10) ? tweets.slice(tweets.length - 10) : tweets
    res.send(ultimosTweets.reverse())
})

