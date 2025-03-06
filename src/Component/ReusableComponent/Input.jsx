// import "./Input.css";

const Input = ({ ref, type, placeholder, onChange, errorMassage, icon, fieldicon, className, defaultValue,value}) => {
  return (
    <>
      <div className={className}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={ defaultValue}
          value={value}
          required
        ></input>
        {icon}
        {errorMassage}
        {fieldicon}
      </div>
    </>
  );
};

export default Input;
