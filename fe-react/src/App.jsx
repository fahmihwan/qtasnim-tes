import { Suspense, lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Router, Routes } from "react-router-dom";
import NavbarEl from "./components/NavbarEl";
import RouterElements from "./routes";

function App() {
    return (
        <>
            <Suspense fallback="Loading...">
                <NavbarEl />
                <Routes>
                    {RouterElements().map((r, i) => (
                        <Route key={i} path={r.path} element={<r.element />} />
                    ))}
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
