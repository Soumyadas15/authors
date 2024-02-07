// import EventRegistrationModal from "../components/modals/event registration/EventRegistrationForm";

import AuthorModal from "./modals/AuthorModal";

const ModalProvider = async () => {
    
    return ( 
        <div>
            <AuthorModal/>
            
            {/* <RegistrationSuccessModal/> */}
        </div>
     );
}

export default ModalProvider;