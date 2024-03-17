import React, { useState } from "react";
import styles from "./GridPlayground.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MIN_ITEM_DEFAULT_WIDTH = 250;
const MAX_ITEM_DEFAULT_WIDTH = 500;
const MIN_ITEM_DEFAULT_HEIGHT = 100;
const MAX_ITEM_DEFAULT_HEIGHT = 500;
const MAX_GAP = 50;

const RoundButton = ({ onClick, children }) => (
  <button className={styles["round-button"]} onClick={onClick}>
    {children}
  </button>
);

const Slider = ({ value, onChange, max }) => (
  <>
    <input type="range" min="0" max={max} value={value} onChange={onChange} />
    <span className={styles.smallLabel}>{value}px</span>
  </>
);

const GridPlayground = () => {
  const [gridTemplateColumns, setGridTemplateColumns] = useState("1fr 1fr 1fr");
  const [gridTemplateRows, setGridTemplateRows] = useState("auto");
  const [numColumns, setNumColumns] = useState(3);
  const [numRows, setNumRows] = useState(1);
  const [rowGap, setRowGap] = useState(0);
  const [columnGap, setColumnGap] = useState(0);
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

  const handleNumColumnsChange = (value) => {
    setNumColumns(value);
    setGridTemplateColumns(`repeat(${value}, 1fr)`);
  };

  const handleNumRowsChange = (value) => {
    setNumRows(value);
    setGridTemplateRows(`repeat(${value}, 1fr)`);
  };

  return (
    <div className={styles["grid-demo-container"]}>
      <h1 className={styles["page-title"]}>Grid Playground</h1>
      <div>
        <div className={styles["controls"]}>
          <div>
            <label className={styles.smallLabel}>Number of Columns:</label>
            <RoundButton onClick={() => handleNumColumnsChange(numColumns - 1)}>
              -
            </RoundButton>
            <span className={styles.smallLabel}>{numColumns}</span>
            <RoundButton onClick={() => handleNumColumnsChange(numColumns + 1)}>
              +
            </RoundButton>
          </div>
          <div>
            <label className={styles.smallLabel}>Number of Rows:</label>
            <RoundButton onClick={() => handleNumRowsChange(numRows - 1)}>
              -
            </RoundButton>
            <span className={styles.smallLabel}>{numRows}</span>
            <RoundButton onClick={() => handleNumRowsChange(numRows + 1)}>
              +
            </RoundButton>
          </div>
          <div>
            <label className={styles.smallLabel}>Row Gap:</label>
            <Slider
              value={rowGap}
              onChange={(e) => setRowGap(e.target.value)}
              max={MAX_GAP}
            />
          </div>
          <div>
            <label className={styles.smallLabel}>Column Gap:</label>
            <Slider
              value={columnGap}
              onChange={(e) => setColumnGap(e.target.value)}
              max={MAX_GAP}
            />
          </div>
          <button className={styles["add-item-button"]} onClick={addItem}>
            Add Item
          </button>
        </div>
      </div>
      <div
        className={styles["grid-demo"]}
        style={{
          gridTemplateColumns,
          gridTemplateRows,
          rowGap: `${rowGap}px`,
          columnGap: `${columnGap}px`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={styles["item"]}
            style={{ width: `${item.width}px`, height: `${item.height}px` }}
          >
            <div className={styles["item-content"]}>
              <p className={styles.smallLabel}>{item.name}</p>
              <div className={styles["slider-container"]}>
                <label className={styles.smallLabel}>Width:</label>
                <Slider
                  value={item.width}
                  onChange={(e) => handleWidthChange(index, e.target.value)}
                  max={MAX_ITEM_DEFAULT_WIDTH}
                />
              </div>
              <div className={styles["slider-container"]}>
                <label className={styles.smallLabel}>Height:</label>
                <Slider
                  value={item.height}
                  onChange={(e) => handleHeightChange(index, e.target.value)}
                  max={MAX_ITEM_DEFAULT_HEIGHT}
                />
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
      <div className={styles["grid-demo-style"]}>
        <h3>Style:</h3>
        <pre className={styles["code-block"]}>
          {`{
    grid-template-columns: `}
          <span className={styles["property-value"]}>
            {gridTemplateColumns}
          </span>
          {`;
    grid-template-rows: `}
          <span className={styles["property-value"]}>{gridTemplateRows}</span>
          {`;
    row-gap: `}
          <span className={styles["property-value"]}>{rowGap}px</span>
          {`;
    column-gap: `}
          <span className={styles["property-value"]}>{columnGap}px</span>
          {`
}`}
        </pre>
      </div>
    </div>
  );
};

export default GridPlayground;
