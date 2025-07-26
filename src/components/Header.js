import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className="app-header">
      <h1>React Quiz App</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;