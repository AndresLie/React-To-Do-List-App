import './Main.css'
// import PropTypes from 'prop-types'; // Import PropTypes

export default function Main({ children }) {
  return (
    <>
      <main className="main">
        {children}
      </main>
      
    </>
  );
}

// Define prop types for Main component
// Main.propTypes = {
//   children: PropTypes.node, // 'node' covers anything that can be rendered: numbers, strings, elements, or an array containing these types.
// };
