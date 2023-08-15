const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: ''
});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
    const dishes_names = ["Omelette", "Quiche", "Egg Fried Rice"];
    const ingredients_prepared = ["Eggs", "Milk", "Salt", "Pepper", "Butter"];
    const serving = 1;

    const prompt = `Provide me with information regarding the dishes I've named and the prepared ingredients. \
     \n
    Dishes Names:\n
    - ${dishes_names.join(', ')}\n
    Prepared ingredients:\n
    - ${ingredients_prepared.join(', ')}\n
    Serving size: ${serving}\n

    To respond, format your answer as a JSON object, \
    with "name", "serving", "ingredients", "time", "instructions" as the keys. \n
    Put the cooking instructions for the specific dish in the correct sequential order in "instructions". \
    The recipe should match the "Ingredients". and should be suitable for ${serving} serving(s).\
    Don't number the first letter of the instructions. \n
    "time" should be integer as minutes.
    `;

    const appropriateExamples = `
    [
        {
          "name": "Omelette",
          "serving": 1,
          "ingredients": ["Eggs", "Milk", "Salt", "Pepper", "Butter"],
          "time": 15,
          "instructions": [
            "In a bowl, whisk 2 eggs with a splash of milk. Season with a pinch of salt and pepper.",
            "Heat a non-stick skillet over medium heat and melt a teaspoon of butter.",
            "Pour the egg mixture into the skillet. Let it cook undisturbed for a minute.",
            "Using a spatula, gently push the cooked edges toward the center, tilting the skillet to let the uncooked egg flow to the edges.",
            "When the omelette is mostly set but still slightly runny on top, add your desired fillings on one half.",
            "Fold the other half of the omelette over the fillings and cook for another minute.",
            "Slide the omelette onto a plate and serve."
          ]
        },
        {
          "name": "Quiche",
          "serving": 4,
          "ingredients": ["Eggs", "Cream", "Pie crust", "Cheese", "Vegetables"],
          "time": 60,
          "instructions": [
            "Preheat the oven to 375°F (190°C).",
            "In a bowl, whisk together 4 eggs and 1 cup of heavy cream.",
            "Roll out the pie crust and line a pie dish. Sprinkle cheese and chopped vegetables on the bottom.",
            "Pour the egg mixture over the cheese and vegetables.",
            "Bake in the preheated oven for 40-45 minutes, or until the quiche is set and golden.",
            "Allow it to cool slightly before slicing and serving."
          ]
        },
        {
          "name": "Egg Fried Rice",
          "serving": 2,
          "ingredients": ["Cooked rice", "Eggs", "Vegetables", "Soy sauce", "Sesame oil"],
          "time": 20,
          "instructions": [
            "Heat a wok or a large skillet over medium-high heat. Add a bit of oil.",
            "Scramble 2 eggs in the wok. Once cooked, remove and set aside.",
            "In the same wok, add more oil if needed. Add chopped vegetables and stir-fry until tender.",
            "Add the cooked rice to the wok. Break up any clumps as it cooks.",
            "Drizzle soy sauce and a bit of sesame oil over the rice. Mix well.",
            "Add the scrambled eggs back to the wok and stir-fry for another minute.",
            "Serve the egg fried rice hot."
          ]
        }
      ]`;

    const fullPrompt = prompt + appropriateExamples;

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'system', content: fullPrompt }],
        max_tokens: 2500,
        temperature: 1,
    });

    console.log(response.data.choices[0].message.content);
};

runPrompt();