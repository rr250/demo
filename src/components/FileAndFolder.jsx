import "./styles.css";

const FileAndFolder = ({
    data,
    handleClick,
    openFolders,
    currentId,
    handleDelete,
}) => {
    const handleKeyDown = (e, item) => {
        e.preventDefault();
        if (e.key === "Enter" || e.key === " ") {
            handleClick(item);
        }
    };
    return (
        <div role="tree">
            {data.map((item) => (
                <div key={item.id} className="file-item">
                    <>
                        <div
                            className={`file ${item.isFolder ? "folder" : ""} ${
                                currentId?.id === item.id ? "active" : ""
                            }`}
                        >
                            <button
                                type="button"
                                onClick={() => handleClick(item)}
                                onKeyDown={(e) => handleKeyDown(e, item)}
                                className={`file-button ${
                                    item.isFolder ? "folder" : ""
                                }`}
                                aria-expanded={!!openFolders?.[item.id]}
                                aria-label={`Folder: ${item.name}`}
                                tabIndex={0}
                                role="treeitem"
                                aria-selected={currentId?.id === item.id}
                            >
                                {item.name}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(item)}
                                className="delete-button"
                                aria-label={`Delete ${item.name}`}
                            >
                                X
                            </button>
                        </div>
                        {item.isFolder
                            ? openFolders?.[item.id] && (
                                  <FileAndFolder
                                      data={item.children || []}
                                      handleClick={handleClick}
                                      openFolders={openFolders}
                                      currentId={currentId}
                                      handleDelete={handleDelete}
                                  />
                              )
                            : null}
                    </>
                </div>
            ))}
        </div>
    );
};

export default FileAndFolder;
