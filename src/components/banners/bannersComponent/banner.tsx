import "../banners.scss";

interface IBanner {
    subTitle: string;
    title: string;
    button?: JSX.Element;
}

const Banner = (props: {
    content: IBanner;
    children?: JSX.Element;
}): JSX.Element => {
    const {subTitle, title, button} = props.content;
    return (
        <div className="banners__banner banner">
            <div>
                <h3 className="banner__sub-title">{subTitle}</h3>
                <h2 className="banner__title heading-2">{title}</h2>
                {button}
            </div>
            {props.children}
        </div>
    );
};

export default Banner;
