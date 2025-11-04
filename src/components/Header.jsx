import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";

function Header() {
  return (
    <header className="mb-6 bg-white shadow md:mb-12 dark:bg-gray-800">
      <div className="container mx-auto px-5 md:px-0">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Header;
