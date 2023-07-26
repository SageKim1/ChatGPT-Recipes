const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    const ingredients_prepared = ["Eggs", "Milk", "Salt", "Pepper", "Butter"];
    const serving = 1;
    const prompt = `Please recommend 3 dishes \
    that can be prepared using the following ingredients:\n
    Prepared ingredients:\n
    - ${ingredients_prepared.join(', ')}\n
    You don't need to use all of the prepared ingredients. \
    You can also suggest dishes that require 1 to 3 additional ingredients. \
    If there are limited options with the prepared ingredients, \
    you can suggest dishes that require more ingredients for a wider variety.\n
    To respond, format your answer as a JSON object \
    with "Name", "Serving", "Ingredients" and "Instructions" as the keys. \
    In the list of "ingredients", the prepared ingredients which are used for the dish should come first, \
    followed by additional ingredients needed for the dish. \n
    Put the cooking instructions for the specific dish in the correct sequential order in "Instructions". \
    The recipe should match the "Ingredients". and should be suitable for ${serving} serving(s). \
    It would be great if it includes specific details such as quantities and measurements. \
    For example: {"Name": "Recipe Name", "Serving": ${serving}, \
    "Ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"], \
    "Instructions": ["Instruction 1", "Instruction 2", "Instruction 3"] }`;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: prompt }],
        max_tokens: 450,
        temperature: 1,
    });

    console.log(response.data.choices[0].message.content);
};

runPrompt();