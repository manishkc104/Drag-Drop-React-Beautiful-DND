import React from "react";
import "./style.css";
import { initialData } from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDrop = () => {
  const [animals, updateAnimals] = React.useState(initialData);

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(animals);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateAnimals(items);
  };

  return (
    <div className="main-container">
      <div className="container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="animals">
            {(provided) => (
              <ul
                className="animals"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {animals.map(({ id, heading, image, description }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="image-container">
                          <img src={image} alt={`${heading} Thumb`} />
                        </div>
                        <div className="information-container">
                          <h3 className="heading">{heading}</h3>
                          <span className="description">{description}</span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragDrop;
