import { useState } from "react";
import FileAndFolder from "./FileAndFolder";
import "./styles.css";
import initialDataJson from "./data.json";

export default function FileExplorer() {
    const [data, setData] = useState(initialDataJson.initialData);
    const [idCounter, setIdCounter] = useState(10);
    const [openFolders, setOpenFolders] = useState([]);
    const [currentId, setCurrentId] = useState(null);

    const handleClick = (item) => {
        console.log("handleClick", item, openFolders);
        if (item.isFolder) {
            setOpenFolders((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
            }));
        }
        setCurrentId(item);
    };

    const handleAdd = (isFolder) => {
        const name = prompt(`Enter ${isFolder ? "folder" : "file"} name:`);
        if (!name) return;
        setData((prev) => {
            const newItem = { id: idCounter, name, isFolder, children: [] };
            if (!currentId) {
                return [...prev, newItem];
            }
            const addItem = (items) => {
                return items.map((item) => {
                    if (item.id === currentId?.id) {
                        if (item.isFolder) {
                            return {
                                ...item,
                                children: item.children
                                    ? [...item.children, newItem]
                                    : [newItem],
                            };
                        } else {
                            items.push(newItem);
                            return item;
                        }
                    }
                    if (item.children) {
                        return {
                            ...item,
                            children: addItem(item.children),
                        };
                    }
                    return item;
                });
            };
            return addItem(prev);
        });
        setIdCounter((prev) => prev + 1);
    };

    const handleDelete = (delItem) => {
        setData((prev) => {
            const deleteItem = (items) => {
                return items
                    .filter((item) => item.id !== delItem?.id)
                    .map((item) =>
                        item.children
                            ? { ...item, children: deleteItem(item.children) }
                            : item
                    );
            };
            return deleteItem(prev);
        });
        if (currentId?.id === delItem?.id) {
            setCurrentId(null);
        }
    };

    return (
        <div className="file-explorer">
            <h2>File Explorer</h2>
            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => handleAdd(false)}>Add File</button>
                <button
                    onClick={() => handleAdd(true)}
                    style={{ marginLeft: "10px" }}
                >
                    Add Folder
                </button>
            </div>
            <FileAndFolder
                data={data}
                handleClick={handleClick}
                openFolders={openFolders}
                currentId={currentId}
                handleDelete={handleDelete}
            />
        </div>
    );
}
