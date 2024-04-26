import { MusicUser } from "./MusicUser.js";

export class Favoritos{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
       
       this.entries = JSON.parse(localStorage.getItem("@SINTONIASOUND: ")) || []
       
    }

    save(){
        localStorage.setItem('@SINTONIASOUND: ', JSON.stringify(this.entries))
    }

    async add(username){
        try{

            const artist = await MusicUser.Busca(username)

            if(artist.artist.desc === undefined){
                throw new Error("Artista não encontrado!")
            }
        

            this.entries = [artist, ...this.entries]
             
            this.update()
            this.save()
            

        }catch(error){
            alert(error.message)
        }
    }

    delete(user){
        const filteredEntris = this.entries.filter(entries => 
             user.artist !== entries.artist
        )

        this.entries = filteredEntris
        this.update()
        this.save()

    }

}

export class FavoritosVisto extends Favoritos{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector("table tbody")

        this.update()
        this.onadd()
    }

    onadd(){
        const addButton = this.root.querySelector('.busca button')
        addButton.onclick = () => {
            const {value} = this.root.querySelector('.busca input')

            this.add(value)
        }
    }

    update(){
        this.removeAllTr()
       
        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.user img').src = `https://www.vagalume.com.br/${user.artist.desc.toLowerCase()}/images/profile.jpg`;
            row.querySelector('.user img').alt = `Imagem de ${user.artist.desc}`
            row.querySelector(".user a").href = `https://www.vagalume.com.br/${user.artist.desc}/`
            row.querySelector(".user span").textContent = user.artist.desc
            row.querySelector(".Genero").textContent = user.artist.genre
            row.querySelector(".acessadas").textContent = user.artist.toplyrics
            
            row.querySelector(".remove").onclick = () => {
                const valueOk = confirm("Tem certeza que deseja apagar")
                
                if(valueOk){
                   this.delete(user)
                }
              
            }

            this.tbody.append(row)
        
        })
       
    }

    createRow(){
        const tr = document.createElement('tr');

        tr.innerHTML = `
        <td class="user">
        <img src="https://www.vagalume.com.br/eminem/images/profile.jpg" alt="Imagem do artista">
        <a href="https://www.vagalume.com.br/eminem/">
            
            <span>Eminem</span>
            </a>
            </td>

            <td class="Genero">
                
            </td>

            <td class="acessadas">
                
            </td>

            <td class="remove">
                <button>&times;</button>
            </td>
        `
        return tr
    }

    removeAllTr(){

        this.tbody.querySelectorAll('tr').forEach((tr) => {tr.remove()})
    }
}