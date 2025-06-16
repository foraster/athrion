const BurgerButton = ({ open, onClick }) => (
  <button className="md:hidden focus:outline-none" onClick={onClick}>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={
          open
            ? "M6 18L18 6M6 6l12 12" // close icon
            : "M4 6h16M4 12h16M4 18h16" // burger icon
        } 
      />
    </svg>
  </button>
);

export default BurgerButton;
