import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import PeopleListPage from "./pages/PeopleList";
import AdvancedFilterPage from "./pages/advancedFilter";
import InfluencerDetailPage from "./pages/peopleDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/List" element={<PeopleListPage />} />
          <Route path="/advanced-filter" element={<AdvancedFilterPage />} />
          <Route path="/influencer/:id" element={<InfluencerDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
