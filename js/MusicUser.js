export class MusicUser{
    static Busca(username){
        const endpoint = ` https://www.vagalume.com.br/${username}/index.js`

        return fetch(endpoint)
        .then(dados => dados.json())
        .then(dados => ({
            "artist":{
                "desc": dados.artist.desc,
                "genre": dados.artist.genre[0].name,
                "toplyrics": dados.artist.toplyrics.item[0].desc
            }
        }))
    }
}

