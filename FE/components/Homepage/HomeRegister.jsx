import "./HomeRegister.css";
const HomeRegister = () => {
  return (
    <div className="home-register">
      <h3>Save time, save money!</h3>
      <p>{`Sign up and we'll send the best deals to you`}</p>
      <div className="register-form-inputs">
        <input
          type="text"
          placeholder="Enter your email"
          className="register-input"
        />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
export default HomeRegister;
