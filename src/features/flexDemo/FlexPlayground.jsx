import React, { useState } from "react";
import styles from "./FlexPlayground.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MIN_ITEM_DEFAULT_WIDTH = 250;
const MAX_ITEM_DEFAULT_WIDTH = 500;
const MIN_ITEM_DEFAULT_HEIGHT = 100;
const MAX_ITEM_DEFAULT_HEIGHT = 500;

const Button = ({ onClick, active, children }) => (
  <button
    className={`${styles["property-button"]} ${
      active && styles["property-button-active"]
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const FlexDemo = () => {
  const [flexDirection, setFlexDirection] = useState("row");
  const [justifyContent, setJustifyContent] = useState("flex-start");
  const [alignItems, setAlignItems] = useState("stretch");
  const [items, setItems] = useState([
    {
      name: "Item 1",
      width: MIN_ITEM_DEFAULT_WIDTH,
      height: MIN_ITEM_DEFAULT_HEIGHT,
    },
    {
      name: "Item 2",
      width: MIN_ITEM_DEFAULT_WIDTH,
      height: MIN_ITEM_DEFAULT_HEIGHT,
    },
    {
      name: "Item 3",
      width: MIN_ITEM_DEFAULT_WIDTH,
      height: MIN_ITEM_DEFAULT_HEIGHT,
    },
  ]);
  const [newItemIndex, setNewItemIndex] = useState(4);

  const addItem = () => {
    setItems([
      ...items,
      {
        name: `Item ${newItemIndex}`,
        width: MIN_ITEM_DEFAULT_WIDTH,
        height: MIN_ITEM_DEFAULT_HEIGHT,
      },
    ]);
    setNewItemIndex((prevIndex) => prevIndex + 1);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleWidthChange = (index, value) => {
    const newItems = [...items];
    newItems[index].width = parseInt(value);
    setItems(newItems);
  };

  const handleHeightChange = (index, value) => {
    const newItems = [...items];
    newItems[index].height = parseInt(value);
    setItems(newItems);
  };

  return (
    <div className={styles["flex-demo-container"]}>
      <h1 className={styles["page-title"]}>Flex Playground</h1>
      <div
        className={styles["flex-demo"]}
        style={{ flexDirection, justifyContent, alignItems }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={styles["item"]}
            style={{
              flexDirection: "column",
              width: `${item.width}px`,
              height: `${item.height}px`,
            }}
          >
            <div className={styles["item-content"]}>
              <p className={styles.smallLabel}>{item.name}</p>
              <div className={styles["slider-container"]}>
                <label className={styles.smallLabel}>Width:</label>
                <input
                  type="range"
                  min={MIN_ITEM_DEFAULT_WIDTH}
                  max={MAX_ITEM_DEFAULT_WIDTH}
                  value={item.width}
                  onChange={(e) => handleWidthChange(index, e.target.value)}
                  style={{ backgroundColor: "black" }}
                />
                <span className={styles.smallLabel}>{item.width}</span>
              </div>
              <div className={styles["slider-container"]}>
                <label className={styles.smallLabel}>Height:</label>
                <input
                  type="range"
                  min={MIN_ITEM_DEFAULT_HEIGHT}
                  max={MAX_ITEM_DEFAULT_HEIGHT}
                  value={item.height}
                  onChange={(e) => handleHeightChange(index, e.target.value)}
                />
                <span className={styles.smallLabel}>{item.height}</span>
              </div>
              <button
                className={`${styles["delete-button"]} ${styles.active}`}
                onClick={() => removeItem(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles["controls"]}>
        <button className={styles["add-item-button"]} onClick={addItem}>
          Add Item
        </button>
        <div>
          <label className={styles.smallLabel}>flex-direction:</label>
          <Button
            active={flexDirection === "row"}
            onClick={() => setFlexDirection("row")}
          >
            Row
          </Button>
          <Button
            active={flexDirection === "column"}
            onClick={() => setFlexDirection("column")}
          >
            Column
          </Button>
        </div>
        <div>
          <label className={styles.smallLabel}>justify-content:</label>
          <Button
            onClick={() => setJustifyContent("flex-start")}
            active={justifyContent === "flex-start"}
          >
            Start
          </Button>
          <Button
            onClick={() => setJustifyContent("center")}
            active={justifyContent === "center"}
          >
            Center
          </Button>
          <Button
            onClick={() => setJustifyContent("flex-end")}
            active={justifyContent === "flex-end"}
          >
            End
          </Button>
          <Button
            onClick={() => setJustifyContent("space-between")}
            active={justifyContent === "space-between"}
          >
            Space Between
          </Button>
          <Button
            onClick={() => setJustifyContent("space-around")}
            active={justifyContent === "space-around"}
          >
            Space Around
          </Button>
        </div>
        <div>
          <label className={styles.smallLabel}>align-items:</label>
          <Button
            onClick={() => setAlignItems("stretch")}
            active={alignItems === "stretch"}
          >
            Stretch
          </Button>
          <Button
            onClick={() => setAlignItems("flex-start")}
            active={alignItems === "flex-start"}
          >
            Start
          </Button>
          <Button
            onClick={() => setAlignItems("center")}
            active={alignItems === "center"}
          >
            Center
          </Button>
          <Button
            onClick={() => setAlignItems("flex-end")}
            active={alignItems === "flex-end"}
          >
            End
          </Button>
          <Button
            onClick={() => setAlignItems("baseline")}
            active={alignItems === "baseline"}
          >
            Baseline
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlexDemo;
