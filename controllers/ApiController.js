const Config = {
    PAT: process.env.CLARIFAI_PAT,
    USER_ID: process.env.CLARIFAI_USER_ID,
    APP_ID: process.env.CLARIFAI_APP_ID,
    MODEL_ID: process.env.CLARIFAI_MODEL_ID,
    MODEL_VERSION_ID: process.env.CLARIFAI_MODEL_VERSION_ID
}

async function handleClarifaiCall(req, res) {
    const { imageURL } = req.body;
    console.log(imageURL)
    console.log(Config);
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": Config.USER_ID,
            "app_id": Config.APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageURL
                    }
                }
            }
        ]
    })
    console.log(raw)
    try{
        const response = await fetch("https://api.clarifai.com/v2/models/" + Config.MODEL_ID + "/versions/" + Config.MODEL_VERSION_ID + "/outputs", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + Config.PAT
            },
            body: raw
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        return res.json(data);
    }catch(e){
        res.status(400).json(e)
    }
   
}

module.exports = { 
    handleClarifaiCall
}