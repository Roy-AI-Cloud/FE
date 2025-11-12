import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  type Location,
} from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/login";
import PeopleListPage from "./pages/PeopleList";
import AdvancedFilterPage from "./pages/advancedFilter";
import InfluencerDetailPage from "./pages/peopleDetail";
import NewProject from "./pages/newProject";

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | undefined;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/youtube/home-list" element={<PeopleListPage />} />
        <Route path="/advanced-filter" element={<AdvancedFilterPage />} />
        <Route
          path="/influencer/:channelId"
          element={<InfluencerDetailPage />}
        />
        <Route path="/new-project" element={<NewProject />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/new-project" element={<NewProject />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
