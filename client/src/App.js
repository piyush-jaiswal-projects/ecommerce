import { Logo1, Logo2 } from "./constants/images";

function App() {
  return (
    <div className="App">
      <img src={Logo1} alt="" />
      <img src={Logo2} alt="" />
      <p className="font-bold">Welcome</p>
    </div>
  );
}

export default App;
