import ContactPhone from '../contactPhone/ContactPhone';
import Auth from '../auth/Auth';

import './topBar.scss';

const TopBar = () => {
	return (
		<div className="topBar">
			<div className="container small-regular topBar__container">
				<ContactPhone />
				{/* <nav className="menu-secondary">
					<a>Delivery & returns</a>
					<a>Track order</a>
					<a>Blog</a>
					<Link to="">Contacts</Link>
				</nav> */}
				<div className="topBar__right-panel">
					{/* <LangChange>Eng / $</LangChange> */}
					<Auth />
				</div>
			</div>
		</div>
	);
};

export default TopBar;
