import './heading.css';

const Heading = ({ title }: { title: string }) => {
	return <h1 className="heading">{title}</h1>;
};

export default Heading;
