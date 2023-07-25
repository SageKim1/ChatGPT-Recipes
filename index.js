const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    const ingredients_prepared = ["Eggs", "Milk", "Salt", "Pepper", "Butter"];
    const prompt = `Please recommend 3 dishes \
    that can be prepared using the following ingredients:\n
    Prepared ingredients:\n
    - ${ingredients_prepared.join(', ')}\n
    You can also suggest dishes that require 1 to 3 additional ingredients. \
    If there are limited options with the prepared ingredients, \
    feel free to suggest dishes that require more ingredients for a wider variety.\n
    To respond, format your answer as a JSON object \
    with "Name" and "Additional ingredients" as the keys.\nFor example:\n
    {"Name": "Recipe Name", \
    "Additional ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"]}`;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 280,
        temperature: 1,
    });

    console.log(response.data.choices[0].message.content);
};

runPrompt();