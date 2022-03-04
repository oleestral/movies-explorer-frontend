import React from "react";
function ErrorPopup(props) {
    return(
       <section className={!props.isError ? "eror-popup eror-popup_hiden" : "eror-popup"} id="popup-error">
           <h3 className="eror-popup__title">{props.title}</h3>
       </section>
    )
}
export default ErrorPopup