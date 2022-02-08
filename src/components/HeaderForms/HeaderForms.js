import Logo from "../Logo/Logo";
function HeaderForms(props) {
    return(
        <header className="header-forms">
            <Logo/>
            <h1 className="header-forms__title">{props.title}</h1>
        </header>
    )
}
export default HeaderForms;