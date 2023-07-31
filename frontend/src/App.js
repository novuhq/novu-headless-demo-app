import AppBar from "./component/AppBar";
import Body from "./component/Body";
import "./styles/app.css";
import hero from './assets/hero-img.png'
const App = () => {

  return (
    <div className="parent-container">
      <div className="left-container">
        <img src={hero} alt="hero" className="hero-img" />
      </div>
      <div className="right-container">
        <div className="heading">
          <h1 className="name">Headless Demo App
          </h1>
          <AppBar />
        </div>
        <div>
          <p>Don't know where to get started? Start <a className="link" href="https://docs.novu.co/notification-center/headless/headless-service/">
            here
          </a>
          </p>

        </div>
        <Body />
      </div>
    </div>
  )
}

export default App;
