import { Route, Routes } from "react-router-dom"
import "./App.scss"
import Header from "./components/Header"
import Footer from "./components/Footer"

import Main from "./pages/Main"
import About from "./pages/About"

// Books Pages
import IndexBooks from "./pages/Books/Index"
import CreateBooks from "./pages/Books/Create"
import DetailsBooks from "./pages/Books/Details"
import EditBooks from "./pages/Books/Edit"
import DeleteBooks from "./pages/Books/Delete"

// Authors Pages
import IndexAuthors from "./pages/Authors/Index"
import CreateAuthors from "./pages/Authors/Create"
import DetailsAuthors from "./pages/Authors/Details"
import EditAuthors from "./pages/Authors/Edit"
import DeleteAuthors from "./pages/Authors/Delete"

const App = () => {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={ <Main /> } />
                <Route path="/about" element={ <About /> } />

                <Route path="/books" element={ <IndexBooks /> } />
                <Route path="/books/create" element={ <CreateBooks /> } />
                <Route path="/books/details/:id" element={ <DetailsBooks /> } />
                <Route path="/books/edit/:id" element={ <EditBooks /> } />
                <Route path="/books/delete/:id" element={ <DeleteBooks /> } />
                
                <Route path="/authors" element={ <IndexAuthors /> } />
                <Route path="/authors/create" element={ <CreateAuthors /> } />
                <Route path="/authors/details/:id" element={ <DetailsAuthors /> } />
                <Route path="/authors/edit/:id" element={ <EditAuthors /> } />
                <Route path="/authors/delete/:id" element={ <DeleteAuthors /> } />
            </Routes>
            
            {/* <Footer /> */}
        </>
    )
}

export default App
