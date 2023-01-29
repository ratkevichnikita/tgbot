import {useEffect} from "react";
import Header from "./components/Header/Header";
import {useTelegram} from "./components/hooks/useTelegram";
import { Route, Routes } from 'react-router-dom';
import ProductsList from "./components/Products/ProductsList";
import Form from "./components/Form/Form";

function App() {

  const { onToggleButton, tg } = useTelegram()

  useEffect(() => {
    tg.ready();
  }, [])

  return (
    <div className="App">
      <Form />
      <div className="wrapper">
        <Header />
        {/*<Routes>*/}
        {/*  <Route  element={<ProductsList />} />*/}
        {/*  <Route index element={<Form />} />*/}
        {/*</Routes>*/}

        {/*<button onClick={onToggleButton} >toggle</button>*/}
      </div>
    </div>
  );
}

export default App;
