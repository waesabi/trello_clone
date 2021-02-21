import React from "react";
import { useAppState } from "../context/AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles/styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./card";

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
  const { state, dispatch } = useAppState();
  return (
    <ColumnContainer>
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
