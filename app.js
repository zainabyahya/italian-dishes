const express = require('express');
const app = express();
const port = 8000;
let italianDishes = require('./data.js')


app.use(express.json());

app.get("/dishes/italian", (req, res) => {
    try {
        res.json(italianDishes);
    } catch (error) {
        res.status(404).send(error);
    }
});

app.get("/dishes/italian/:id", (req, res) => {
    try {
        const dishId = parseInt(req.params.id);
        if (!dishId) {
            res.status(404).send("Dish is not found!")
        }
        const foundDish = italianDishes.find(dish => dish.id === dishId);
        res.status(200).json(foundDish);
    } catch (error) {
        res.status(404).send(error, "Dish is not found!");
    }
});

app.post("/dishes/italian", (req, res) => {
    try {
        const newDish = { ...req.body, id: 5 }
        if (!newDish.name || !newDish.image || !newDish.price || !newDish.description) {
            res.status(404).send("Please provide all the needed information.");
        }
        italianDishes.push(newDish);
        res.json(italianDishes);

    } catch (error) {
        res.status(404).send(error);
    }

});

app.delete('/dishes/italian/:id', (req, res) => {
    const dishId = req.params.id;
    try {
        italianDishes = italianDishes.filter((dish) => dish.id !== Number(dishId));
        res.json(italianDishes);
    } catch (error) {
        res.status(404).send(error, "Dish is not found!");
    }
});

app.put('/dishes/italian/:id', (req, res) => {
    const dishId = req.params.id;
    const updatedDishData = req.body
    try {

        italianDishes = italianDishes.map((dish) => {
            if (dish.id === Number(dishId)) {
                return updatedDishData;
            }
            return dish;
        });
        res.json(italianDishes);
    } catch (error) {
        res.status(404).send(error, "Dish is not found!");
    }
});


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});