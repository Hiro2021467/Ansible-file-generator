import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Font Awesomeのスタイルシートをインポート
import "font-awesome/css/font-awesome.min.css";

const ItemType = "ITEM";

function PlaybookEditor() {

  // アイテムのリストを管理するステート
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);

  // アイテムを移動する関数
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  // アイテムを追加する関数
  const addItem = () => {
    setItems([...items, `New Item ${items.length + 1}`]);
  };

  // アイテムを削除する関数
  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Playbook Editor</h1>
      </div>
      <div>
        {items.map((item, index) => (
          <DraggableItem key={index} index={index} item={item} moveItem={moveItem} removeItem={() => removeItem(index)} />
        ))}
      </div>
      <div>
        <button onClick={addItem}>Add Item</button>
      </div>
    </DndProvider>
  );
}

function DraggableItem({ item, index, moveItem, removeItem }) {
  // ドラッギング可能なアイテムのコンポーネント

  // ドラッグアンドドロップのセットアップ
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  // 編集モードの管理
  const [isEditing, setEditing] = useState(false);

  // テキスト入力フィールドの参照
  const inputRef = useRef(null);

  // 編集モードを開始するハンドラ
  const handleClick = () => {
    setEditing(true);
  };

  // 編集モードを終了するハンドラ
  const handleBlur = () => {
    setEditing(false);
  };

  // テキスト入力値が変更されたときのハンドラ
  const handleInputChange = (e) => {
    const updatedItems = [...items];
    updatedItems[index] = e.target.value;
    setItems(updatedItems);
  };

  // アイテムを削除するハンドラ
  const handleRemoveClick = () => {
    removeItem(index);
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      className={`Item ${isEditing ? "Editing" : ""}`}
      style={{ border: "2px solid #333", padding: "10px", marginBottom: "5px", display: "flex", alignItems: "center", position: "relative" }}
    >
      <div className="DragHandle">
        <i className="fa fa-bars"></i>
      </div>

      {/* テキストボックス１ */}
      <div>
        {isEditing ? (
        <div className="EditItem">
          <input
            type="text"
            value={item}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={inputRef}
            autoFocus
          />
          {/* <i className="fa fa-pencil PencilIcon"></i> */}
        </div>
      ) : (
        <div onClick={handleClick} className="ItemText">
          <span>{item}</span>
          <i className="fa fa-trash-o TrashIcon" onClick={handleRemoveClick}></i>
        </div>
      )}
      </div>
    </div>
  );
}

function TextBox({ isEditing, item, index, handleInputChange, handleBlur, handleClick, handleRemoveClick, inputRef }) {
  return (
    <>
      {isEditing ? (
        <div className="EditItem">
          <input
            type="text"
            value={item}
            onChange={handleInputChange}
            onBlur={handleBlur}
            ref={inputRef}
            autoFocus
          />
          {/* <i className="fa fa-pencil PencilIcon"></i> */}
        </div>
      ) : (
        <div onClick={handleClick} className="ItemText">
          <span>{item}</span>
          <i className="fa fa-trash-o TrashIcon" onClick={handleRemoveClick}></i>
        </div>
      )}
    </>
  );
}

export default PlaybookEditor;