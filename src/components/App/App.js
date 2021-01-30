import Header from '../Header/Header';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App_wrap">
      <Header />
      <Main />
      </div>
      <About />
      <Footer />
    </div>
  );
}

export default App;
