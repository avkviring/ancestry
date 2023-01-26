import React from "react";
import useStore, { DefaultStore } from "./hooks/useStore";

import Main from "./pages/main";

type Store = ReturnType<typeof useStore>;

const defaultStore = new DefaultStore();

export const NodeContext = React.createContext<Store>(defaultStore);

const StoreWrapper = (Component: () => JSX.Element) => {
  const Wrapper = (props: any) => {
    const store = useStore();

    return (
      <NodeContext.Provider value={store}>
        <Component {...props} />
      </NodeContext.Provider>
    );
  };

  return Wrapper;
};

const App = () => {
  return <Main />;
};

export default StoreWrapper(App);
