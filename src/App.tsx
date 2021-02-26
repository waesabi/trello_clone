import React from "react";
import { AddNewItem } from "./components/AddNewItem";
import { Column } from "./components/column";
import { useAppState } from "./context/AppStateContext";
import { AppContainer } from "./styles/styles";

function App() {
  const { state, dispatch } = useAppState();
  return (
    <AppContainer>
      {state.lists.map((item, i) => {
        return <Column key={item.id} text={item.text} index={i} id={item.id} />;
      })}
      <AddNewItem
        toggleButtonText="+ Add Another List"
        onAdd={(text) =>
          dispatch({
            type: "ADD_LIST",
            payload: text,
          })
        }
      />
    </AppContainer>
  );
}

export default App;
