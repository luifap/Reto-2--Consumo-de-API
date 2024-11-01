const Alert = ({ children, className }) => (
    <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`} role="alert">
      {children}
    </div>
  );
  
  export default Alert;
  