import './navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<>
			<nav className="navigation">
				<NavLink to="/" className="navigation__link">
					Report data
				</NavLink>
				<NavLink to="/test" className="navigation__link">
					Test data
				</NavLink>
				<NavLink to="/business" className="navigation__link">
					Business data
				</NavLink>
			</nav>
		</>
	);
};

export default Navigation;
