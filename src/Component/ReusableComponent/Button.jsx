// import "./Button.css";

const Button = ({ Name, onClick, className = "" }) => {
  return (
    <>
      {/* <div className={className}> */}
      <button onClick={onClick} className={className}>
        {Name}
      </button>

      {/* </div> */}
    </>
  );
};
export default Button;
