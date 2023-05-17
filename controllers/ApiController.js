const axios = require('axios');
const Config = {
    PAT: process.env.CLARIFAI_PAT,
    USER_ID: process.env.CLARIFAI_USER_ID,
    APP_ID: process.env.CLARIFAI_APP_ID,
    MODEL_ID: process.env.CLARIFAI_MODEL_ID,
    MODEL_VERSION_ID: process.env.CLARIFAI_MODEL_VERSION_ID
}

async function handleClarifaiCall(req, res) {
    const { imageURL } = req.body;
    const body = {
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
    };
    try{
        const response = await axios.post("https://api.clarifai.com/v2/models/" + Config.MODEL_ID + "/versions/" + Config.MODEL_VERSION_ID + "/outputs", 
            body,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Key ' + Config.PAT
                }
            }
        );
        return res.json(response.data);
    }catch(e){
        console.log(e);
        res.status(400).json({ err: "Unable to call API"})
    }
   
}

module.exports = { 
    handleClarifaiCall
}