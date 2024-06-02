const LoadingSpinner = () => {
  return (
    <>
      <span className="visually-hidden">Loading...</span>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    </>
  );
};

export default LoadingSpinner;
