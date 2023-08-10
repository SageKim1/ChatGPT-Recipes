const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    const ingredients_prepared = ["Eggs", "Milk", "Salt", "Pepper", "Butter"];
    const prompt = `Please recommend 5 dishes \
    that can be prepared using the following ingredients:\n
    Prepared ingredients:\n
    - ${ingredients_prepared.join(', ')}\n
    You don't need to use all of the prepared ingredients. \
    You can also suggest dishes that require 1 to 3 additional ingredients. \
    If there are limited options with the prepared ingredients, \
    you can suggest dishes that require more ingredients for a wider variety. \
    You should give only the names of dishes. \
    Don't provide the recipe and ingredients. \n`;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 450,
        temperature: 1,
    });

    console.log(response.data.choices[0].message.content);
};

runPrompt();