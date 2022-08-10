import React, { useEffect, useState } from "react";
import "./App.scss";
import ElementsSlider from "./components/Slider/Slider";

const App = () => {
    let [categories, setCategories] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState(1);
    let [sliderElements, setSliderElements] = useState([]);
    let [elementsToShow, setElementsToShow] = useState([]);

    const changeSelect = (id) => {
        let newCategories = categories.map((category) => {
            if (category.id === id) {
                category.select = true;
            } else {
                category.select = false;
            }
            return category;
        });

        setCategories(newCategories);
        setSelectedCategory(id);
    };

    useEffect(() => {
        let asyncSetCategories = async () => {
            let tempCategory = await fetch(
                "https://my-json-server.typicode.com/glebov-g/frontend-fake-db/categories"
            ).then((response) => response.json());
            tempCategory = tempCategory.map((category, index) => {
                if (index === 0) {
                    category.select = true;
                } else {
                    category.select = false;
                }
                return category;
            });
            setCategories(tempCategory);
        };
        asyncSetCategories();
    }, []);
    useEffect(() => {
        let asyncSetSliderElements = async () => {
            let tempSliderElements = await fetch(
                "https://my-json-server.typicode.com/glebov-g/frontend-fake-db/items"
            ).then((response) => response.json());
            setSliderElements(tempSliderElements);
        };
        asyncSetSliderElements();
    }, []);
    useEffect(() => {
        setElementsToShow(
            sliderElements.filter(
                (element) => element.categoryId === selectedCategory
            )
        );
    }, [selectedCategory, sliderElements]);

    return (
        <>
            <div className="App">
                <div className="App__wrapper">
                    <h1 className="App__h1">Блог и соцсети</h1>
                    <p className="App__text">
                        Идейные соображения высшего порядка, а также сложившаяся
                        структура организации представляет собой интересный
                        эксперимент проверки направлений прогрессивного
                        развития.
                    </p>
                    <div className="App__categories">
                        {categories.map((category) => {
                            return (
                                <div
                                    key={category.id}
                                    className={
                                        "App__category " +
                                        (category.select === true
                                            ? "select"
                                            : "")
                                    }
                                    onClick={() => changeSelect(category.id)}
                                >
                                    {category.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {elementsToShow.length > 0 ? (
                    <ElementsSlider sliderElements={elementsToShow} />
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default React.memo(App);
