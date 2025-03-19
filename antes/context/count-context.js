const {useState, createContext, useContext} = React;

const CountContext = createContext(null);

function CountContextProvider({children}) {
  const [count, setCount] = useState(0);
  const [countRestart, setCountRestart] = useState(0);
  return (
    <CountContext.Provider value={{count, setCount, countRestart,setCountRestart}}>
      {children}
    </CountContext.Provider>
  );
}

window.CountContext = CountContext;
window.CountContextProvider = CountContext.Provider;