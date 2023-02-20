const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-organization",
    apiKey: "sk-apiKey",
});
const openai = new OpenAIApi(configuration);

const app = express()
const port = 3080

app.use(bodyParser.json())
app.use(cors())
app.use(require('morgan')('dev'))

app.post('/', async (req, res) => {
	const { message, currentModel, temperature } = req.body;
	const response = await openai.createCompletion({
		model: `${currentModel}`,
		prompt: `${message}`,
		max_tokens: 100, 
		temperature,
	  });
	res.json({
		message: response.data.choices[0].text,
	})
});

app.get('/models', async (req, res) => {
	const response = await openai.listEngines();
	res.json({
		models: response.data
	})
});

app.listen(port, () => {
	  console.log(`Example app listening at http://localhost:${port}`)
});       