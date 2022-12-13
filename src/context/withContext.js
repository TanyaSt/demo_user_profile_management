import {AppContext} from "./app-context";

export default Component => {
    return  props => {
        return (
            <AppContext.Consumer>
                {context => <Component {...props} context={context}/>}
            </AppContext.Consumer>
        );
    }
}