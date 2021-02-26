import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useAppState } from "../context/AppStateContext";
import { DragItem } from "../components/DragItem";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    item,
    begin: () =>
      dispatch({
        type: "SET_DRAGGED_ITEM",
        payload: item,
      }),
    end: () => dispatch({ type: "SET_DRAGGED_ITEM", payload: undefined }),
  });
  return { drag };
};
