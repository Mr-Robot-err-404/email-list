const options = [
    {
        username: "Jules_Winnfield", 
        email: "jwinnfield587@gmail.com"
    }, 
    {
        username: "Vincent_Vega", 
        email: "vincentvega7732@gmail.com"
    },
    {
        username: "Dr_Schultz",
        email: "darthplagus50@gmail.com" 
    } 
]

export function generate() {
    const idx = Math.floor(Math.random() * options.length)
    return options[idx]
}