import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles/styles";
import { useItemDrag } from "../utils/useItemDrag";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./card";
import { DragItem } from "./DragItem";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column = ({
  text,
  index,
  id,
  children,
}: React.PropsWithChildren<ColumnProps>) => {
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({
        type: "MOVE_LIST",
        payload: {
          dragIndex,
          hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    type: "COLUMN",
    index,
    id,
    text,
  });
  drag(drop(ref));
  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((item) => (
        <Card text={item.text} key={item.id} />
      ))}

      <AddNewItem
        dark
        toggleButtonText="+ Add Another Task"
        onAdd={(text) =>
          dispatch({
            type: "ADD_TASK",
            payload: {
              text,
              listId: id,
            },
          })
        }
      />
    </ColumnContainer>
  );
};
