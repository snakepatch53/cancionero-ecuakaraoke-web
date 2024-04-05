import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Header from "./components/Header";
import Musics from "./views/Musics";
import New from "./views/New";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<Musics />} />
                <Route path="/new/:id" element={<New />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
