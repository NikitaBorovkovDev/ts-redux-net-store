import {useState} from "react";
import axios from "axios";
import "../banners.scss";

interface ISubscribeBanner {
    subTitle: string;
    title: string;
    emailSubscribe: {
        inputPlaceholderText: string;
        buttonText: string;
        text: string;
    };
}

const SubscribeBanner = (props: {content: ISubscribeBanner}): JSX.Element => {
    const {subTitle, title} = props.content;
    const {inputPlaceholderText, buttonText, text} =
        props.content.emailSubscribe;

    const [inputValue, setInputValue] = useState("");

    const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value: string) {
        return EMAIL_REGEXP.test(value);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        console.log(inputValue);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEmailValid(inputValue)) {
            const email = {email: inputValue};
            console.log(email);
            axios
                .post("http://localhost:3009/posts", email)
                .then((response) => {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.config);
                });

            // fetch('http://localhost:3009/posts', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: email
            // }).then(data => {
            //     if (data.ok) {
            //         console.log('ok')
            //     } else {
            //         console.log('not ok')
            //     }
            // })
        } else {
            console.log("not valid");
        }
    };

    return (
        <div className="banners__banner banner">
            <div>
                <h3 className="banner__sub-title123123">
                    <span>{subTitle}</span>
                </h3>
                <h2 className="banner__title heading-2">{title}</h2>
                <form
                    autoComplete="on"
                    noValidate
                    action="#"
                    onSubmit={handleSubmit}
                    className="banner__form">
                    <input
                        className="banner__input"
                        name="email"
                        placeholder={inputPlaceholderText}
                        value={inputValue}
                        onChange={handleChange}
                    />
                    <button className="banner__button" type="submit">
                        {buttonText}
                    </button>
                    <p className="banner__input">{text}</p>
                </form>
            </div>
        </div>
    );
};

export default SubscribeBanner;
