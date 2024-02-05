interface Map {
    [key: string] : {
        title: string
        body: string
    }
}

export const map: Map = {
    "INSERT": {
        title: "Welcome to the mailing list", 
        body: "Thank you for signing up with our Mailing List!"
    }, 
    "MODIFY": {
        title: "Your username has been changed", 
        body: "Your new username has been updated to ..."
    }, 
    "REMOVE": {
        title: "Removed from the mailing list", 
        body: "You will no longer receive messages from our Mailing List"
    }
}