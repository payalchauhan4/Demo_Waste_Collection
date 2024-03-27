import React from "react";

const CollectionList = ({ collection }) => {
  return (
    <div className="collection_list">
      {collection ? (
        collection.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: item.binColor,
                padding: "10px",
                marginBottom: "10px",
                color: "white",
                width: "calc(50% - 20px)",
                textAlign: "left",
              }}
            >
              <h3>{item.binType}</h3>
              <p>{item.collectionDay}</p>
              <p>Following by {item.followingDay}</p>
            </div>
          );
        })
      ) : (
        <p>No Collection Found!!</p>
      )}
    </div>
  );
};

export default CollectionList;
