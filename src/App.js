import { Route, Routes } from "react-router-dom";
import { Products } from "./pages/Products";
import { DishProvider } from "./context/dishContext";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Analytics } from "./pages/Analytics";
import { Categories } from "./pages/Categories";
import { DataProvider } from "./context/dataContext";
import { ApiProvider } from "./context/apiContext";

function App() {
  return (
    <>
      <ApiProvider>
        <DataProvider>
          <DishProvider>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </DishProvider>
        </DataProvider>
      </ApiProvider>
    </>
  );
}

export default App;
