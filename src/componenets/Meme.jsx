import React from "react"

export default function Meme() {

    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => (
            {
                ...prevMeme,
                [name]: value
            }
        ))
    }

    function changeImage(event) {
        event.preventDefault()
        const newUrl = allMemes[Math.floor(Math.random() * allMemes.length)].url
        setMeme((prevMeme) => (
            {
                ...prevMeme,
                imageUrl: newUrl
            }
        ))
    }

    return (
        <main className="meme">
            <form onSubmit={changeImage}>
                <div className="inputs">
                    <div className="input">
                        <label htmlFor="input-1">Top-text</label>
                        <input 
                            type="text"
                            id="input-1"
                            placeholder="Shut up"
                            name="topText"
                            value={meme.topText}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="input-2">Bottom-text</label>
                        <input 
                            type="text"
                            id="input-2"
                            placeholder="And take my money"
                            name="bottomText"
                            value={meme.bottomText}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className="img-button" type="submit">Get a new meme image  🖼</button>
            </form>
            <div className="meme-format">
                <img src={meme.imageUrl} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}