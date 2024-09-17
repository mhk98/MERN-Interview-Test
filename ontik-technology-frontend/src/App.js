import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllDrawings from './components/AllDrawings';
import { Provider } from 'react-redux';
import store from './app/store';
import DrawingDetail from './components/DrawingDetail';



function App() {
  return (
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path="/" element={<AllDrawings />} />
        <Route path="/drawing/:id" element={<DrawingDetail />} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
