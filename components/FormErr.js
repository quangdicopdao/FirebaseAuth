import { HelperText } from "react-native-paper";

function FormErr({type, visible}) {
    return ( 
        <HelperText type={type} visible={visible}>
            
        </HelperText>
     );
}

export default FormErr;