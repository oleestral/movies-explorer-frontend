function AboutHeaders(props) {
    return (
        <div className='about-headers' style={{backgroundColor: props.color}}>
            <h2 className="about-headers__title">{props.title}</h2>
            <hr className="about-headers__line"/>
        </div>
    )
}
export default AboutHeaders;