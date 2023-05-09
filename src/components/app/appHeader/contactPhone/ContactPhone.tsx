import "./contactPhone.scss";
const ContactPhone = () => {
    return (
        <a className="small-regular contactPhone" href="tel: +14055550128">
            Available 24/7 at{" "}
            <span className="contactPhone__number">(405) 555-0128</span>
        </a>
    );
};

export default ContactPhone;
