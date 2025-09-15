import "./styles.css";

const FileAndFolder = ({ data, handleClick, openFolders, currentId }) => {
    const handleKeyDown = (e, item) => {
        e.preventDefault();
        if (e.key === "Enter" || e.key === " ") {
            console.log("clicked", item);
            handleClick(item);
            console.log(openFolders);
        }
    };
    return (
        <div role="tree">
            {data.map((item) => (
                <div key={item.id} style={{ marginLeft: "20px" }}>
                    {item.isFolder ? (
                        <>
                            <button
                                type="button"
                                onClick={() => handleClick(item)}
                                onKeyDown={(e) => handleKeyDown(e, item)}
                                className={`file folder ${
                                    currentId?.id === item.id ? "active" : ""
                                }`}
                                aria-expanded={!!openFolders?.[item.id]}
                                aria-label={`Folder: ${item.name}`}
                                tabIndex={0}
                                role="treeitem"
                                aria-selected={currentId?.id === item.id}
                            >
                                {item.name}
                            </button>
                            {openFolders?.[item.id] && (
                                <FileAndFolder
                                    data={item.children || []}
                                    handleClick={handleClick}
                                    openFolders={openFolders}
                                    currentId={currentId}
                                />
                            )}
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => handleClick(item)}
                            onKeyDown={(e) => handleKeyDown(e, item)}
                            className={`file ${
                                currentId?.id === item.id ? "active" : ""
                            }`}
                            aria-label={`File: ${item.name}`}
                            tabIndex={0}
                            role="treeitem"
                            aria-selected={currentId?.id === item.id}
                        >
                            {item.name}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FileAndFolder;
