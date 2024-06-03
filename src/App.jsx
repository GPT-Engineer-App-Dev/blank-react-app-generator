import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";

function App() {
  const { session } = useSupabaseAuth();

  return (
    <Router>
      <Routes>
        {session ? (
          <Route exact path="/" element={<Index />} />
        ) : (
          <Route exact path="/" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
