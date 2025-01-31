import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Header from "./components/Header";
import Musics from "./views/Musics";
import New from "./views/New";
import Frontpage from "./views/Frontpage";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<Musics />} />
                <Route path="/new/:id" element={<New />} />
                <Route path="/frontpage" element={<Frontpage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
